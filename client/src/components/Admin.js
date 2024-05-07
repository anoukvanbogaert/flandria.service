import React, { useState } from 'react';
import './Admin.scss';
import classNames from 'classnames';
import { AddCircleOutline, PlaylistAdd, PostAdd, Edit } from '@mui/icons-material';

import CustomButton from './CustomButton';

import AdminAddClient from './AddSection/AddOptions';
import AdminAddExService from './AdminAddExService';
import AdminAddOffer from './AdminAddOffer';

const Admin = () => {
    const [activeComponent, setActiveComponent] = useState(1);

    const handleClick = (component) => {
        activeComponent === component ? setActiveComponent('') : setActiveComponent(component);
    };

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
            <div className={optionsClass}>
                <CustomButton
                    onClick={() => handleClick(1)}
                    selected={activeComponent === 1}
                    icon={AddCircleOutline}
                >
                    Add
                </CustomButton>
                <CustomButton
                    onClick={() => handleClick(4)}
                    selected={activeComponent === 4}
                    icon={Edit}
                >
                    Edit
                </CustomButton>
                <CustomButton
                    onClick={() => handleClick(2)}
                    selected={activeComponent === 2}
                    icon={PlaylistAdd}
                >
                    Log a service
                </CustomButton>
                <CustomButton
                    onClick={() => handleClick(3)}
                    selected={activeComponent === 3}
                    icon={PostAdd}
                >
                    View Data
                </CustomButton>
            </div>
            <div className={formClass}>
                {activeComponent === 1 && <AdminAddClient />}
                {activeComponent === 2 && <AdminAddExService open={afterClick} />}
                {activeComponent === 3 && <AdminAddOffer />}
            </div>
        </div>
    );
};

export default Admin;
