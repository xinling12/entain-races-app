import styled from 'styled-components'

export const RaceCard = styled.div`
position: relative;
width: 280px;
height: 300px;
background: #fff;
border:2px solid #ff7800;
border-radius: 8px;
box-shadow: 0 0 5px rgb(0 0 0 / 10%);
text-align: left;
padding: 20px;
margin-top: 100px;
&:hover{
    box-shadow: 0 0 10px rgb(0 0 0 / 40%);
}
div{
    margin-bottom: 5px;
}
span{
    position: absolute;
    right: 20px;
    bottom: 50px;
    color: #ff7800;
}
`