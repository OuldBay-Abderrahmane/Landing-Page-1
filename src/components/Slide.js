import React, { useState, useCallback } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import "./Slide.css";
import data from "../data";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import ArrowDownwardTwoToneIcon from "@material-ui/icons/ArrowDownwardTwoTone";


export default function Slide() {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
  return (
    <div className="slides">
      <AnchorLink className="header-arrow" href="#first-page">
        <ArrowDownwardTwoToneIcon />
      </AnchorLink>
      {data.pages.map((pages) => (
        <div key={pages.id_}>
          {pages.text_seq_ === "" ? (
            <div className="row-slide" id={pages.id_}>
              <div className="row-slide-text">
                <h1> {pages.title_}</h1>
                <p> {pages.text_}</p>
              </div>
              {Array.isArray(pages.image_) ? (
                <div>
                  <Gallery
                    className="gallery"
                    photos={pages.image_}
                    onClick={openLightbox}
                  />
                  <ModalGateway>
                    {viewerIsOpen ? (
                      <Modal onClose={closeLightbox}>
                        <Carousel
                          currentIndex={currentImage}
                          views={pages.image_.map((x) => ({
                            ...x,
                            srcset: x.srcSet,
                            caption: x.title,
                          }))}
                        />
                      </Modal>
                    ) : null}
                  </ModalGateway>
                  <AnchorLink className="slide-arrow" href={pages.next_}>
                    <ArrowDownwardTwoToneIcon />
                  </AnchorLink>
                </div>
              ) : (
                <div
                  className="row-slide-image"
                  key={pages.id_}
                  id={pages.id_ + "-image"}
                  style={{
                    backgroundImage: `url(${
                      process.env.PUBLIC_URL + pages.image_
                    }`,
                  }}
                ></div>
              )}
              <div className="slide-arrow">
                <AnchorLink href={pages.next_}>
                  <ArrowDownwardTwoToneIcon />
                </AnchorLink>
              </div>
            </div>
          ) : (
            <div className="column-slide" id={pages.id_} key={pages.id_}>
              <div className="column-slide-text">
                <h1> {pages.title_}</h1>
                <p> {pages.text_}</p>
              </div>
              {Array.isArray(pages.image_) ? (
                <div className="column-slide-gallery">
                  <Gallery
                    className="gallery"
                    photos={pages.image_}
                    onClick={openLightbox}
                  />
                  <ModalGateway>
                    {viewerIsOpen ? (
                      <Modal onClose={closeLightbox}>
                        <Carousel
                          currentIndex={currentImage}
                          views={pages.image_.map((x) => ({
                            ...x,
                            srcset: x.srcSet,
                            caption: x.title,
                          }))}
                        />
                      </Modal>
                    ) : null}
                  </ModalGateway>
                </div>
              ) : (
                <div
                  className="column-slide-image"
                  id={pages.id_ + "-image"}
                  style={{
                    backgroundImage: `url(${
                      process.env.PUBLIC_URL + pages.image_
                    }`,
                  }}
                ></div>
              )}
              {pages.text_seq_ === "" ? null : (
                <p className="column-slide-text-seq">{pages.text_seq_}</p>
              )}
              <div className="slide-arrow-column" id={pages.id_ + "-arrow"}>
                <AnchorLink href={pages.next_}>
                  <ArrowDownwardTwoToneIcon />
                </AnchorLink>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
