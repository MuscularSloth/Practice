import React from 'react'
import CardBarter from './CardBarter'
import { useSelector } from 'react-redux';

export default function BartersList() {

    const allBartersData = useSelector(state => state.barterReducer.barters);
    return (
        <div className="mb-5">

            { allBartersData?.map((barterInfo)=>(
                <CardBarter key={barterInfo.id} barterInfo={barterInfo}/>
            )
            )}
            
        </div>
    )
}
