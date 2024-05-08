import React from 'react';
import { Button } from '@mui/material';
import classNames from 'classnames';
import './CustomButton.scss';

const CustomButton = ({ children, selected, onClick, icon: Icon }) => {
    return (
        <Button
            className={classNames('custom-button', { 'custom-button--selected': selected })}
            onMouseOver={({ target }) => target.classList.add('custom-button--hover')}
            onMouseOut={({ target }) => target.classList.remove('custom-button--hover')}
            onClick={onClick}
            startIcon={Icon ? <Icon /> : null}
        >
            {children}
        </Button>
    );
};

export default CustomButton;
