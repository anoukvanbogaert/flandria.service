import React from 'react';
import './form.scss';
import classNames from 'classnames';


const AdminAddExService = ({open}) => {

  const formClass = classNames("admin__form", {
    "admin__form--open": open,
    "admin__form--close": !open
  });

  return (
    <div className="form__background">

      <div className={formClass}>
        <h2 className="admin__form__title">Add an executed service</h2>
        <div className="admin__form__body">
          <form>
            <div className="form__item__block">
              <label>Select service</label>
              <input
                className="form__item"
                type="text"
                placeholder="e.g. John"
              />
            </div>


            <div className="form__item__block">
              <label>Date</label>
              <input
                className="form__item"
                type="text"
                placeholder="e.g. Sunseeker"
              />
            </div>

            <div className="form__item__block">
              <label>Client</label>
              <input
                className="form__item"
                type="text"
                placeholder="e.g. John@example.com"
              />
            </div>

            <div className="form__item__block">
              <label>Boat</label>
              <input
                className="form__item"
                type="text"
                placeholder="e.g. Manhattan"
              />
            </div>

            <div className="form__item__large" >
              <label>Remark</label>
              <input
                className="form__item"
                type="text"
                placeholder="e.g. 1234"
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

export default AdminAddExService;