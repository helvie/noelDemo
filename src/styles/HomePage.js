import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import GiftsContainer from './GiftsContainer'
import UserConnectedGiftsContainer from './UserConnectedGiftsContainer'
import { usersArray } from '../utils/datas';


function HomePage() {

    const [isLoading, setIsLoading] = useState(false);
    const [openedSectionIndex, setOpenedSectionIndex] = useState(null);
    const [openedSectionUser, setOpenedSectionUser] = useState(null);
    const [datas, setDatas] = useState(usersArray);
    const [isEditing, setIsEditing] = useState(false);
    const [modalDisplay, setModalDisplay] = useState(false);


    let colorNumber = 1;

    const colors=["#FFD700", "#7fa348", "#f3e4df"]

    // console.log("isEditing du homepage "+isEditing)


    const handleSectionClick = (index) => {
        console.log("arg")
        console.log("isediting "+isEditing)
        if(isEditing){setModalDisplay(true)}
        if (openedSectionIndex === index) {
            // Si la section actuellement ouverte est cliquée à nouveau, fermez-la.
            setOpenedSectionIndex(null);
        } else {
            // Sinon, ouvrez la section correspondante.
            setOpenedSectionIndex(index);
            setOpenedSectionUser(false)
        }
    };

    const handleUserSectionClick = () => {
        console.log("arg2")
        console.log("isediting "+isEditing)
        if(isEditing){setModalDisplay(true)}


        if(isEditing){setModalDisplay(true)}

        if(openedSectionUser) {
        setOpenedSectionUser(false)
        }
        else
        {
            setOpenedSectionUser(true);
            setOpenedSectionIndex(null)
        }
    }



    const connectedUserSection = datas
    .filter((data) => data.pseudo === "Armel")
    .map((data, i) => {
        const color = colors[0];
        return (
            <UserConnectedGiftsContainer
                key={i}
                color={color}
                isExpanded={openedSectionUser}
                onClick={() => handleUserSectionClick(i)}
                data = {data}
                isEditing={isEditing}
                modalDisplay={modalDisplay}
                setModalDisplay={setModalDisplay}
                changeIsEditing={setIsEditing}
            />
        )
    })

    const usersSections = datas
    .filter((data) => data.pseudo !== "Armel")
    .map((data, i) => {
        const color = colors[colorNumber];
        colorNumber = colorNumber===colors.length-1 ? 0 : colorNumber+1;
        return (
            <GiftsContainer
                key={i}
                color={color}
                isExpanded={openedSectionIndex === i}
                onClick={() => handleSectionClick(i)}
                data = {data}
            />
        )
    })


    return (
        <main>
            <div className={styles.orgContent}>
                {isLoading ? (
                    <div>Chargement en cours...</div>
                ) : (
                    <>
                        <div className={styles.firstSection}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                            numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                            optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                            obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                            nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                            tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                            quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
                            sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
                            recusandae alias error harum maxime adipisci amet laborum. Perspiciatis
                            minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit </div>
                            
                        {connectedUserSection}
                        {usersSections}
                        
                    </>
                )}
            </div>
        </main >

    );
}

export default HomePage;