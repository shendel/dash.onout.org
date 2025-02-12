import GA from 'react-ga';


import { IMAGES } from "../../assets";
import { PRODUCTS } from "../../constants";
import { UserActions } from "../UserProvider";
import useUser from "../../hooks/useUser";

import "./index.css";
import { Link, useLocation } from 'react-router-dom';

const ProductList = () => {
  const location = useLocation();
  const { dispatch } = useUser();

  const openDetails = (id: string) => {
    dispatch({
      type: UserActions.changeView,
      payload: id,
    });
  };
  
  let status = '';
  if(location.pathname === '/presale'){
    status = 'development';
  } else if(location.pathname === '' || location.pathname === '/') {
    status = 'ready';
  } else {
    status = '';
  }

  return (
    <section>
      <div className="products">
        {Object.keys(PRODUCTS).map((id) => {
          const { name, howToEarn, adminCanEdit, description, imgSrc, imgAlt, price, lables } =
            PRODUCTS[id];
          if(PRODUCTS[id].status === status) {
            return (
              <div
                key={id}
                className="productCard"
                onClick={() => {
                window.location.assign(`#/products/${id}`);
                  openDetails(id);
                  GA.event({
                    category: 'Product list',
                    action: `Open ${id}`,
                  });
                }}
              >
                <>
                  <img src={imgSrc} alt={imgAlt} />
                  {lables.includes('new') && (
                    <div className='newProduct'>
                      <img
                        src={IMAGES.newProduct}
                        alt="New Product"
                      />
                    </div>
                  )}
                  <div className={`textContent${price ? ' hasBuyButton' : ''}`}>
                    <h3 className="contentTitle">{name}</h3>
                    {description && <p className="description">{description}</p>}
                    {howToEarn && (
                      <div className="subsection">
                        <h4 className="subtitle">How to earn</h4>
                        <p className="subdescription">{howToEarn}</p>
                      </div>
                    )}
                    {adminCanEdit && (
                      <div className="subsection">
                        <h4 className="subtitle">Admin can edit</h4>
                        <p className="subdescription">{adminCanEdit}</p>
                      </div>
                    )}
                  </div>
                </>
  
                {price && (
                  <div className='boxLink'>
                    <Link to={`/products/${id}`}  className="primaryBtn buyBtn">
                      {`Buy for $${price}`}
                    </Link>
                  </div>
                )}
              </div>
            );
          }
        })}
      </div>
    </section>
  );
};

export default ProductList;
