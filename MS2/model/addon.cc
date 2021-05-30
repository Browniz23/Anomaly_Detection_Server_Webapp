#include <string>
#include <napi.h>
#include <iostream>
#include "timeseries.h"
#include "SimpleAnomalyDetector.h"
#include "HybridAnomalyDetector.h"
#include "json.hpp"
#include <iostream>
#include <fstream>

using namespace std;
using json = nlohmann::json;

void detect(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();

  // put info in std string. same name as in the js file.
  Napi::String csv1Napi = info[0].ToString();
  Napi::String csv2Napi = info[1].ToString();
  Napi::String algoNapi = info[2].ToString();
  std::string csv1 = csv1Napi.Utf8Value();
  std::string csv2 = csv2Napi.Utf8Value();
  std::string algo = algoNapi.Utf8Value();

  // create TimeSeries obj, using csv train and test file.
  TimeSeries tsLearn(csv1.c_str());
  TimeSeries tsTest(csv2.c_str());

  //create anomaly detector. decide hybrid or simple by the input in 'algo'.
  SimpleAnomalyDetector *ad;
  if (algo == "regression")
    ad = new SimpleAnomalyDetector();
  else
  {
    ad = new HybridAnomalyDetector();
  }

  // run the algorithem
  ad->learnNormal(tsLearn);

  vector<AnomalyReport> ar = ad->detect(tsTest);

  // create file to save the properties of the anomalies
  ofstream file;
  file.open("../model/ar.csv");
  int flag = 0, n = 0;
  string des = "";

  // loop over all the anomalies and save
  for (AnomalyReport a : ar)
  {
    if (des == a.description)
    {
      if (n == a.timeStep - 1)
      {
        flag = 1;
        n = a.timeStep;
        continue;
      }
      else
      {
        file << "," << n << "\n";
        file << a.description << "," << a.timeStep;
      }
    }
    else
    {
      if (flag)
      {
        file << "," << n << "\n";
        file << a.description << "," << a.timeStep;
      }
      else
      {
        file << a.description << "," << a.timeStep;
      }
      flag = 0;
    }
    n = a.timeStep;
    des = a.description;
  }
  if (ar.size() != 0)
    file << "," << ar[ar.size() - 1].timeStep;
  file.close();
  delete ad;
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
  return Napi::Function::New(env, detect);
}

NODE_API_MODULE(addon, Init)
