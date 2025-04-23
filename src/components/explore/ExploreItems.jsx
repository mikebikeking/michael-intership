import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CountDown from "../CountDown";

const ExploreItems = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemCount, setItemCount] = useState(8);

  async function filterItems(filter) {
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
    );
    setUsers(response.data);
  }

  async function main() {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setUsers(data);
    setLoading(false);
  }

  useEffect(() => {
    main();
  }, []);

  const displayedUsers = users.slice(0, itemCount);

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => filterItems(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        <div className="row">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton circle={true} height={32} width={32} />
                </div>
                <div className="nft__item_wrap">
                  <Skeleton height={200} />
                </div>
                <div className="nft__item_info">
                  <Skeleton height={20} width={150} />
                  <Skeleton height={20} width={100} />
                  <Skeleton height={15} width={50} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="row">
          {displayedUsers.map((user, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${user.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img
                      className="lazy"
                      src={user.authorImage}
                      alt={user.author}
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {user.expiryDate && <CountDown expiryDate={user.expiryDate} />}
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a
                          href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=Check out this NFT`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a
                          href={`mailto:?subject=Check out this NFT&body=${window.location.href}`}
                        >
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${user.nftId}`}>
                    <img
                      src={user.nftImage}
                      className="lazy nft__item_preview"
                      alt={user.title}
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${user.nftId}`}>
                    <h4>{user.title}</h4>
                  </Link>
                  <div className="nft__item_price">{user.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{user.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="col-md-12 text-center">
        {itemCount !== 16 && (
          <Link
            onClick={() => setItemCount(itemCount + 4)}
            to=""
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
