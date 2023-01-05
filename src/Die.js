import React from "react";

export default function Die(props){
    let styles = {
        backgroundColor : props.isHeld ? "var(--dice-held)" : "var(--pure-white)"
    }

    const diceDots = {
        1:(<><div className="dice__dot"></div></>),
        2:(<><div className="dice__dot"></div><div className="dice__dot"></div></>),
        3:(<><div className="dice__dot"></div><div className="dice__dot"></div><div className="dice__dot"></div></>),
        4:(<><div className="dice__dot"></div><div className="dice__dot"></div><div className="dice__dot"></div><div className="dice__dot"></div></>),
        5:(<><div className="dice__dot"></div><div className="dice__dot"></div><div className="dice__dot"></div><div className="dice__dot"></div><div className="dice__dot"></div></>),
        6:(<><div className="dice__dot"></div><div className="dice__dot"></div><div className="dice__dot"></div><div className="dice__dot"></div><div className="dice__dot"></div><div className="dice__dot"></div></>)
    }

    return (
        <div 
            className="dice flex" 
            style={styles}
            onClick={() =>props.holdDice(props.id)}
        >
            <div className={props.value %2 == 0 ?"grid__dice":"flex__dice"}>
                {diceDots[props.value]}
            </div>
        </div>
    )
}