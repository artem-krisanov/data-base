import React from 'react';

const ToolTip = ({user}) => {
    const {address, description, email, firstName, id, lastName, phone} = user;
    const {city, state, streetAddress, zip} = address;
    console.log(address)
    return (
        <div>
            <div>address:
                <div>   city: {city}</div>
                <div>   state: {state}</div>
                <div>   streetAddress: {streetAddress}</div>
                <div>   zip: {zip}</div>
            </div>
            <div>description: {description}</div>
            <div>email: {email}</div>
            <div>firstName: {firstName}</div>
            <div>id: {id}</div>
            <div>lastName: {lastName}</div>
            <div>phone: {phone}</div>
        </div>
    )
}

export default ToolTip