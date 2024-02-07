import React from 'react';
import './form.scss';
import classNames from 'classnames';


const AdminAddOffer = () => {

  // const formClass = classNames("admin__form", {
  //   "admin__form--open": open,
  //   "admin__form--close": !open
  // });

  return (
    <div className="form__background">

      <div className="admin__form">
        <h2 className="admin__form__title">Add a service offer </h2>
        <div className="admin__form__body">
          <form>
            <div className="form__item__wide">
              <label>Service name</label>
              <input
                className="form__item"
                type="text"
                placeholder="e.g. Checking oil"
              />
            </div>

            <div className="form__item__wide">
              <button>ADD</button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default AdminAddOffer;