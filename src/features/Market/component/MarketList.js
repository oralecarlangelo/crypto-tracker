import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMarketList, marketSelect } from "../marketSlice";
import { Link } from "react-router-dom";
import { formatter } from "../../../commons/format/priceFormat";

const MarketList = () => {
  const dispatch = useDispatch();
  const { marketList } = useSelector(marketSelect);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage] = React.useState(15);
  const pageNumbers = [];

  React.useEffect(() => {
    dispatch(getMarketList());
    const interval = setInterval(() => {
      dispatch(getMarketList());
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const indexOfLastItem = currentPage * postsPerPage;
  const indexOfFirstItem = indexOfLastItem - postsPerPage;
  const currentItems =
    marketList && marketList.slice(indexOfFirstItem, indexOfLastItem);

  for (let i = 1; i <= Math.ceil(marketList.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className=" flex-1 mx-32 h-[90%]  overflow-hidden">
      <div className="grid grid-cols-5 p-5 bg-gray-100 ">
        <div>Name</div>
        <div>Price</div>
        <div>24h Change</div>
        <div>24h Volume</div>
        <div>Market Cap</div>
      </div>
      {currentItems.map((item) => (
        <Link
          to={`/${item.id}`}
          key={item.id}
          className="grid grid-cols-5 p-5 bg-white border-b-2 border-gray-300"
        >
          <div className="flex items-center flex-1 gap-2">
            <div
              style={{ backgroundImage: `url(${item.image})` }}
              className="bg-center bg-cover w-7 h-7"
            />
            <p className="text-xl">{item.name}</p>
            <span className="text-gray-500">{item.symbol}</span>
          </div>
          <div>{formatter.format(item.current_price)}</div>
          <div
            className={`flex items-center gap-2 ${
              item.price_change_percentage_24h < 0
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {item.price_change_percentage_24h.toFixed(2) < 0 ? (
              <i className="fa-solid fa-caret-down"></i>
            ) : (
              <i className="fa-solid fa-caret-up"></i>
            )}
            {item.price_change_percentage_24h.toFixed(2)}%
          </div>
          <div>{formatter.format(item.total_volume)}</div>
          <div>{formatter.format(item.market_cap)}</div>
        </Link>
      ))}
      <div className="flex items-center justify-end flex-1 bg-gray-200">
        <div className="flex text-lg">
          {pageNumbers.map((number) => (
            <button
              onClick={() => setCurrentPage(number)}
              className="px-5 py-3 hover:bg-gray-300"
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketList;
