import React from 'react';
import './form.scss';
import classNames from 'classnames';


const AdminAddClient = ({open}) => {

  const formClass = classNames("admin__form", {
    "admin__form--open": open,
    "admin__form--close": !open
  });

  return (
    <div className="form__background">

      <div className={formClass}>
        <h2 className="admin__form__title">Add a client</h2>
        <div className="admin__form__body">
          <form>
            <div className="form__item__block">
              <label>Client Name</label>
              <input
                className="form__item"
                type="text"
                placeholder="e.g. John"
              />
            </div>


            <div className="form__item__block">
              <label>Boat Brand</label>
              <input
                className="form__item"
                type="text"
                placeholder="e.g. Sunseeker"
              />
            </div>

            <div className="form__item__block">
              <label>Client Email</label>
              <input
                className="form__item"
                type="text"
                placeholder="e.g. John@example.com"
              />
            </div>

            <div className="form__item__block">
              <label>Boat Model</label>
              <input
                className="form__item"
                type="text"
                placeholder="e.g. Manhattan"
              />
            </div>

            <div className="form__item__block">
              <label>Temporary Client Password</label>
              <input
                className="form__item"
                type="text"
                placeholder="e.g. 1234"
              />
            </div>


            <div className="form__item__block">
              <label>Delivery Date</label>
              <input
                className="form__item"
                type="text"
                placeholder="CHANGE INTO DATE PICKER"
              />
            </div>

            <div></div>

            <div className="form__item__block">
              <label>Boat Name</label>
              <input
                className="form__item"
                type="text"
                placeholder="e.g. Diddlina"
              />
            </div>

            <div>
              <button>ADD</button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default AdminAddClient;