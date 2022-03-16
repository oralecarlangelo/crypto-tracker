import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCoinDetail, getMarketChart, marketSelect } from "../marketSlice";
import MarketChart from "./MarketChart";

const MarketDetail = () => {
  const { coinDetail } = useSelector(marketSelect);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [days, setDays] = React.useState("1");

  React.useEffect(() => {
    dispatch(getMarketChart({ id, days }));
    const interval = setInterval(() => {
      dispatch(getMarketChart({ id, days }));
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [days, id]);

  React.useEffect(() => {
    dispatch(getCoinDetail({ id }));
    const interval = setInterval(() => {
      dispatch(getCoinDetail({ id }));
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [id]);

  return (
    <div className="mx-auto max-w-7xl">
      <MarketChart id={id} days={days} setDays={setDays} />
      <div className="grid grid-cols-3 gap-5 my-20">
        <div>
          <p className="mb-2 ">Market Cap</p>
          <span className="text-xl font-semibold">{coinDetail.market_cap}</span>
        </div>
        <div>
          <p className="mb-2 ">Volume(24h)</p>
          <span className="text-xl font-semibold">
            {coinDetail.total_volume}
          </span>
        </div>
        <div>
          <p className="mb-2 ">Circulating Supply</p>
          <span className="text-xl font-semibold">
            {coinDetail.circulating_supply}
          </span>
        </div>
        <div>
          <p className="mb-2">Total Supply</p>
          <span className="text-xl font-semibold">
            {coinDetail.total_supply}
          </span>
        </div>
        <div>
          <p className="mb-2 ">High(24h)</p>
          <span className="text-xl font-semibold">{coinDetail.high_24h}</span>
        </div>
        <div>
          <p className="mb-2 ">Low(24h)</p>
          <span className="text-xl font-semibold">{coinDetail.low_24h}</span>
        </div>
      </div>
    </div>
  );
};

export default MarketDetail;
