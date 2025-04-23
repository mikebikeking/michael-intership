import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AuthorItems = ({ authorData }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  if (loading) {
    return (
      <div className="de_tab_content">
        <div className="tab-1">
          <div className="row">
            {Array(4) 
              .fill(0)
              .map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton circle={true} height={32} width={32} />
                    </div>
                    <div className="nft__item_wrap">
                      <Skeleton height={200} />
                    </div>
                    <div className="nft__item_info">
                      <Skeleton width={150} />
                      <div className="nft__item_price">
                        <Skeleton width={80} />
                      </div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <Skeleton width={30} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {authorData &&
            authorData.nftCollection &&
            authorData.nftCollection.map((item, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={index}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to="">
                      <img
                        className="lazy"
                        src={authorData.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="nft__item_wrap">
                    <Link to={`/item-details/${item.nftId}`}>
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={`/item-details/${item.nftId}`}>
                      <h4>{item.title}</h4>
                    </Link>
                    <div className="nft__item_price">{item.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;