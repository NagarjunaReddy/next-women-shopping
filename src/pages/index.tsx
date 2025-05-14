import Footer from "@/components/footer";
import PageIntro from "@/components/page-intro";
import ProductsFeatured from "@/components/products-featured";

import Layout from "../layouts/Main";

const IndexPage = () => {
  return (
    <Layout>
      <PageIntro />

      <section className="featured">
        <div className="container">
          <article
            style={{ backgroundImage: "url(/images/featured-1.jpg)" }}
            className="featured-item featured-item-large"
          >
            <div className="featured-item__content">
              <h3>New arrivals are now in!</h3>
              <a href="/products" className="btn btn--rounded">
                Show Collection
              </a>
            </div>
          </article>

          <article
            style={{ backgroundImage: "url(/images/featured-2.jpg)" }}
            className="featured-item featured-item-small-first"
          >
            <div className="featured-item__content">
              <h3>Basic Western wear ₹699</h3>
              <a href="/products" className="btn btn--rounded">
                More details
              </a>
            </div>
          </article>

          <article
            style={{ backgroundImage: "url(/images/featured-3.jpg)" }}
            className="featured-item featured-item-small"
          >
            <div className="featured-item__content">
              <h3>Sale this summer</h3>
              <a href="/products" className="btn btn--rounded">
                VIEW ALL
              </a>
            </div>
          </article>
        </div>
      </section>

      

      <ProductsFeatured />
      <Footer />
    </Layout>
  );
};

export default IndexPage;
