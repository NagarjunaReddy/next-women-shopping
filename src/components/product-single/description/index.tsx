type ProductDescriptionType = {
  show: boolean;
};

const Description = ({ show }: ProductDescriptionType) => {
  const style = {
    display: show ? "flex" : "none",
  };

  return (
  <section style={style} className="product-single__description">
   <div className="product-description-block">
   <i className="icon-cart" />
   <h4>Details and product description</h4>
   <p>
      <b>Occasion</b> : Casual || Party || Beach || Formal || Meeting || Office wear{" "}
      <br />
   <ul>
      <li><b>Fabric</b> : Georgette</li>
      <li><b>Sleeve Length</b> : Long Sleeve</li>
      <li><b>Shape</b> : Fit and Flare</li>
   </ul>
   </p>
</div>
  </section>
  );
};

export default Description;
