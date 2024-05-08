import { useState, useEffect } from 'react';
import classNames from 'classnames';

const useAdminAddClient = () => {
    const [step, setStep] = useState(1);
    const [selection, setSelection] = useState('');
    const [loading, setLoading] = useState(false);
    const [operationStatus, setOperationStatus] = useState('idle');
    const [clientData, setClientData] = useState({
        name: '',
        email: '',
        boat: [],
    });
    const [boatData, setBoatData] = useState({
        client: null,
        name: '',
        brand: '',
        model: '',
        remark: '',
    });
    const [serviceData, setServiceData] = useState({
        services: [],
        date: null,
        client: null,
        boat: [],
        brand: '',
        model: '',
        remark: '',
    });

    const handleSave = async () => {
        setLoading(true);
        try {
            // Here you would handle the actual save logic
            setOperationStatus('success');
        } catch (error) {
            console.error('Error saving document:', error);
            setOperationStatus('error');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setClientData({ name: '', email: '', boat: [] });
        setBoatData({ client: null, name: '', brand: '', model: '', remark: '' });
        setServiceData({
            services: [],
            date: null,
            client: null,
            boat: [],
            brand: '',
            model: '',
            remark: '',
        });
        setOperationStatus('idle');
    };

    useEffect(() => {
        if (operationStatus === 'success') {
            setTimeout(() => {
                resetForm();
                setStep(1);
            }, 2000);
        }
    }, [operationStatus]);

    const formClass = classNames('admin__form', {
        'admin__form--open': step !== 1,
        'admin__form--close': step === 1,
    });

    return {
        step,
        setStep,
        selection,
        setSelection,
        loading,
        operationStatus,
        clientData,
        setClientData,
        boatData,
        setBoatData,
        serviceData,
        setServiceData,
        handleSave,
        resetForm,
        formClass,
    };
};

export default useAdminAddClient;
