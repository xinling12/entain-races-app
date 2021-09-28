import moment from "moment"
import React, {useEffect, useState} from "react"
import { Form, Spinner } from "react-bootstrap"
import Countdown from "react-countdown"
import { useRaces } from "../hooks/useRaces"
import { RaceCard } from "./styles/RaceCard"
import { RaceContainer } from "./styles/RaceContainer"
import { useDispatch } from "react-redux"

const Races: React.FC<Record<string, unknown>> = () => {

    const displayRaces = useRaces()
    const dispatch = useDispatch()
    const [display, setDisplay] = useState(displayRaces?.length>0)
    
    const categoryMap = [
        {"Greyhound racing": '9daef0d7-bf3c-4f50-921d-8e818c60fe61'},
        {"Harness racing": '161d9be2-e909-4326-8c2c-35ed71fb460b'},
        {"Horse racing": '4a2788f8-e825-4d36-9894-efd4baf1cfae'}
    ]

    const Completionist = () => <span>Race Started</span>

    const handleCategoryClick = (categoryItem:string) =>{
        switch (categoryItem) {
            case 'Greyhound racing':
                dispatch({type:"UPDATE_GREYHOUND"})
                break;

            case 'Harness racing':
                dispatch({type:"UPDATE_HARNESS"})
                break;
            
            case 'Horse racing':
                dispatch({type:"UPDATE_HORSE"})
                break;
            default:
                return null
        }
    }

    useEffect(() => {
        if(displayRaces?.length > 0) setDisplay(true)
    }, [displayRaces])
    
    return (
        <RaceContainer>
            {display ?
            <React.Fragment>
            <Form>
            {categoryMap.map((category, index)=>{
                return <Form.Check key={index} defaultChecked={true} type="checkbox" label={Object.keys(category)} onClick={(event: React.MouseEvent<HTMLElement>)=>handleCategoryClick(Object.keys(category).toString())} />
            })}
            </Form>

            {displayRaces?.map((item, index) => {
                const {meeting_name, race_number, advertised_start:{seconds}} = item;
                const formattedTime = moment.utc(seconds*1000).utcOffset(600).format('lll');
                return (<RaceCard key={index}>
                    <h2>{meeting_name}</h2>  
                    <div>Race Number: {race_number}</div>
                    <div>{formattedTime}</div>
                    <Countdown date={seconds * 1000} >
                        <Completionist />
                    </Countdown>
                </RaceCard>)
            })}
            </React.Fragment>  : 
            <Spinner animation="grow" />}
        </RaceContainer>
    )
}

export default Races