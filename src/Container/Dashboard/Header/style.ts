import styled from "styled-components"

const HeaderPageContainer = styled.header`
    .headerPage{
        background-color: ${({theme}) => theme["green-300"]};
        height: 85px;
        display: flex;
        align-items: center;

        .headerPage__containerlogo{
            display: flex;
            align-items: center;

            img{
                width: 150px;
            }

        }

        .headerPage__containerIconMenu{

            margin-left: 30px;
            display: flex;
            align-items: center;

            .containerIconMenu__icon{
                color: white;
                font-size: 1.3rem;
                cursor: pointer;
            }

        }
    }

`

export default HeaderPageContainer