import React from "react";
import { FaChevronDown, FaChevronRight, FaSearch } from "react-icons/fa";
import { CanvasJSChart } from "canvasjs-react-charts";
import stock from "../assets/stock.svg";

const Graph = () => {
  const [show, setShow] = React.useState(false);
  const [searchString, setSearchString] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  // create a state named currentSymbol
  const [currentSymbol, setCurrentSymbol] = React.useState("");
  // create a currentDataPoint state
  const [currentDataPoints, setCurrentDataPoints] = React.useState([]);

  const [predictedPrice, setPredictedPrice] = React.useState([]);

  React.useEffect(() => {
    if (currentSymbol) {
      fetch(
        `https://estock-server.herokuapp.com/predict?symbol=${currentSymbol[0]}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          let result = [];
          for (let i in data.data.actual) {
            result.push({
              x: new Date(i),
              y: parseInt(data.data.actual[i]),
            });
          }
          setPredictedPrice(data.data.Prediction[0]);
          setCurrentDataPoints(result);
        });
    }
  }, [currentSymbol]);

  const handleSearch = (e) => {
    if (searchString) {
      fetch(`https://estock-server.herokuapp.com/search?query=${searchString}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          let result = res.data.bestMatches.map((item) => {
            return {
              name: item["2. name"],
              symbol: item["1. symbol"],
            };
          });
          setSearchResult(result);
          console.log(result);
        });
    }
  };

  return (
    <div id="search" className="flex flex-col bg-deep-blue px-10">
      <div className="text-white text-5xl font-bold mb-3 flex">
        Welcome to <div className="text-green ml-3">EStock</div>
      </div>
      <div className="text-gray text-lg mb-5">Predict your favorite stock</div>
      <div className="flex items-center justify-center mb-5 relative">
        <div className="relative">
          <input
            className="h-14 px-4 py-2 bg-white outline-none w-96"
            type="text"
            placeholder="Enter the stock name"
            style={{
              borderRadius:
                searchResult.length > 0 ? "5px 0px 0px 0px" : "5px 0px 0px 5px",
            }}
            onChange={(e) => setSearchString(e.target.value)}
          ></input>
          {searchResult.length > 0 && (
            <div
              className="absolute left-0 top-14 bg-white w-96 z-10"
              style={{ borderRadius: "0px 0px 5px 5px" }}
            >
              {searchResult.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setCurrentSymbol([item.symbol, item.name]);
                      setSearchString("");
                      setSearchResult([]);
                    }}
                    className="py-3 flex flex-col px-8 cursor-pointer"
                  >
                    <div className="text-black text-2xl font-bold flex">
                      {item.symbol}
                    </div>
                    <div className="text-gray text-sm">{item.name}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="h-14 px-4 py-2 bg-white text-green outline-none w-14"
        >
          <FaSearch />
        </button>

        <div className="dropdown">
          <button
            className="dropbtn bg-white font-bold text-black flex items-center"
            style={{
              borderRadius: show ? "0px 5px 0px 0px" : "0px 5px 5px 0px",
            }}
            onClick={() => setShow(!show)}
          >
            Last 30 days
            {show ? (
              <FaChevronRight className="ml-2 text-green" />
            ) : (
              <FaChevronDown className="ml-2 text-green" />
            )}
          </button>
          <div
            className="dropdown-content bg-white"
            style={{
              display: show ? "" : "none",
              borderRadius: "0px 0px 5px 5px",
            }}
          >
            <button className="p-2 font-bold text-base">Last 30 days</button>
            <button className="p-2 font-bold text-base">Link 15 days</button>
            <button className="p-2 font-bold text-base">Link 10 days</button>
            <button className="p-2 font-bold text-base">Link 5 days</button>
          </div>
        </div>
      </div>
      <div>
        <CanvasJSChart
          options={{
            theme: "dark1",
            animationEnabled: true,
            zoomEnabled: true,
            axisY: {
              title: "Price in USD",
              prefix: "$",
            },
            data: [
              {
                type: "splineArea",
                color: "#42ea72",
                xValueFormatString: "YYYY MM DD",
                yValueFormatString: "$#,##0.00",
                dataPoints: currentDataPoints,
              },
            ],
          }}
        />
        {currentSymbol ? <></> : <div className="h-32"></div>}
      </div>
      {true && (
        <div className="bg-white rounded-lg flex items-center justify-between px-4 my-6 py-2">
          <div className="flex items-center">
            <div className="mr-10">
              <img src={stock} className="h-14 w-14" />
            </div>
            <div className="flex flex-col">
              <div className="text-black text-2xl font-bold ">
                Predicted Stock Price
              </div>
              <div className="text-gray text-base">{currentSymbol[1]}</div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-green text-4xl">{predictedPrice}</div>
            <div className="text-gray text-sm text-left">Predicted Price</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Graph;
