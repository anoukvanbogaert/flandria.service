import React, { useState } from 'react';
import './Admin.scss';
import classNames from 'classnames';
import BoatData from './BoatData';
import AdminOptions from './AdminOptions';
import AdminForms from './AdminForms';

const Admin = () => {
    const [activeComponent, setActiveComponent] = useState(1);
    const [selection, setSelection] = useState('');
    console.log('selection', selection);

    let afterClick = '';
    if (activeComponent) {
        afterClick = true;
    } else {
        afterClick = false;
    }

    const formClass = classNames('admin__form', {
        'admin__form--open': afterClick,
        'admin__form--close': !afterClick,
    });

    const optionsClass = classNames('admin__options', {
        'admin__options--middle': !afterClick,
        'admin__options--left': afterClick,
    });

    return (
        <div className='admin__container'>
            <div className={formClass}>
                <AdminOptions setSelection={setSelection} />
                {/* {selection && <AdminForms selection={selection} />} */}
                {selection === 'boat' && <BoatData />}
            </div>
        </div>
    );
};

export default Admin;
