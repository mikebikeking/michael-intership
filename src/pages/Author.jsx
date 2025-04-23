import React, { useEffect, useState, useCallback } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Author = () => {
  const [authorData, setAuthorData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const id = useParams().id;

  const getAuthorData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      );
      setAuthorData(response.data);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getAuthorData();
  }, [getAuthorData]);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>

          <section
            id="profile_banner"
            aria-label="section"
            className="text-light"
            style={{ background: `url(${AuthorBanner}) top` }}
          ></section>

          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton circle={true} height={100} width={100} />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            <Skeleton width={150} />
                            <span className="profile_username">
                              <Skeleton width={80} />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton width={200} />
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          <Skeleton width={100} /> followers
                        </div>
                        <Skeleton width={100} height={36} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <Skeleton count={3} height={200} />
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

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {authorData.authorImage && (
                        <img
                          src={authorData.authorImage}
                          alt={authorData.authorName}
                        />
                      )}
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorData.authorName}
                          <span className="profile_username">
                            @{authorData.tag}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {authorData.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {authorData.followers + (isFollowing ? 1 : 0)} followers
                      </div>
                      {isFollowing ? (
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={() => setIsFollowing(!isFollowing)}
                        >
                          Unfollow
                        </Link>
                      ) : (
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={() => setIsFollowing(!isFollowing)}
                        >
                          Follow
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorData={authorData} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;