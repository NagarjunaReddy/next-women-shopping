import Footer from "@/components/footer";
import PageIntro from "@/components/page-intro";

import Layout from "../layouts/Main";
import ChatBot from "@/components/chat-bot/ChatBot";

const IndexPage = () => {
  return (
    <Layout>
      <PageIntro />
      <ChatBot />
      {/*<ProductsFeatured />*/}
      <Footer />
    </Layout>
  );
};

export default IndexPage;
