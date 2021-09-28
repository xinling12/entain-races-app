import styled from 'styled-components'

export const RaceContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    background-color: #f6f8fd;
    height: 100vh;
    Form{
        position: absolute;
        top:40px;
        display: flex;
        .form-check{
            margin-left: 10px;
        }
    }
    .spinner-grow{
        margin-top: 50vh;
    }
`