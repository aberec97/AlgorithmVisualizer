import React from 'react';
const ButtonHolder = (props) => {
    return (
        <div>
            {props.buttons.map(
                b => <button
                    key={b.id}
                    onClick={() => props.onSelect(b.name)}
                    className='btn btn-primary btn-sm'>
                    {b.name}
                </button>)}
        </div>);
}

export default ButtonHolder;