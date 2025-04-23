import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ItemDetails = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const id = useParams().id;

  async function main() {
    // Simulate a longer loading time for demonstration
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
    );
    setUsers(data);
    setLoading(false);
  }

  useEffect(() => {
    main();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <Skeleton
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    height={300} // Adjust height as needed
                    width={400} // Adjust width as needed
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>
                      <Skeleton width={200} /> <Skeleton width={50} />
                    </h2>
                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i> <Skeleton width={40} />
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i> <Skeleton width={40} />
                      </div>
                    </div>
                    <p>
                      <Skeleton count={3} />
                    </p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6><Skeleton width={80} /></h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Skeleton circle={true} height={40} width={40} />
                          </div>
                          <div className="author_list_info">
                            <Skeleton width={100} />
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6><Skeleton width={80} /></h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Skeleton circle={true} height={40} width={40} />
                          </div>
                          <div className="author_list_info">
                            <Skeleton width={100} />
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6><Skeleton width={60} /></h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" style={{ visibility: 'hidden' }} /> {/* Keep the image for layout, hide it */}
                        <Skeleton width={80} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={users.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {users.title} #{users.tag}
                  </h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {users.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {users.likes}
                    </div>
                  </div>
                  <p>{users.description}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${users.ownerId}`}>
                            <img
                              className="lazy"
                              src={users.ownerImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${users.ownerId}`}>
                            {users.ownerName}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${users.creatorId}`}>
                            <img
                              className="lazy"
                              src={users.creatorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${users.creatorId}`}>{users.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{users.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;