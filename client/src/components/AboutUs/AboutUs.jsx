import React from 'react'
import Footer from '../Footer/Footer'
import st from './AboutUs.module.css'

export default function AboutUs() {
  return (
    <div>
      
      <div className={st.container}>

        <div className={st.aboutUsContainer}>
          <h3 className=' text-center'>Know more about the Clothes4Crew Team!</h3>
          
          <div className={st.infoDiv}>
            <h4>Who we are?</h4>
            <p>Clothes4Crew was born from a business idea of some friends who decided to open their own online clothing store, where you can find the latest and best trends in underground, classic and luxury fashion, from the most recognized brands around the world.</p>
          </div>

          <div className={st.infoDiv}>
            <h4>Why choose Clothes4Crew to buy your clothes?</h4>
            <p>Clothes4Crew more than an online store, is a fashion technology platform where you can find the most recent collections of the most recognized brands in the world at incredible prices. You will find all kinds of garments, from accessories to footwear, for any occasion and for any gender, in addition your purchases are protected by the mercadopago system and you will have the security of receiving your order at the door of your house.<br/>
            We like to dress you cool and fresh ;)</p>
          </div>

          <h4 className=' text-center mb-8'>Clothes4Crew Team</h4>
          <div className={st.devsDiv}>

            <div className={st.developer}>
              <span>Andrés Cardozo</span>
              <img src="/images/Devs Pics/Andres.jpg" alt="Andrés Photo" className={st.devImg} />
              <a href="https://www.linkedin.com/in/andr%C3%A9s-eduardo-cardozo-landaeta-8940ba150/">
                <img src="\images\IN.png" alt="LI logo" className={st.linkedLogo} />
              </a>
            </div>

            <div className={st.developer}>
              <span>Alejandro Henao</span>
              <img src="/images/Devs Pics/Alejandro.jpg" alt="Alejandro Photo" className={st.devImg} />
              <a href="https://www.linkedin.com/in/alejandro-henao-lopera/">
                <img src="\images\IN.png" alt="LI logo" className={st.linkedLogo} />
              </a>
            </div>

            <div className={st.developer}>
              <span>Cristina Murgía</span>
              <img src="/images/Devs Pics/Cristina.png" alt="Cristina Photo" className={st.devImg} />
              <a href="https://www.linkedin.com/in/cristina-murguia">
                <img src="\images\IN.png" alt="LI logo" className={st.linkedLogo} />
              </a>
            </div>

            <div className={st.developer}>
              <span>Felipe Medina</span>
              <img src="/images/Devs Pics/Felipe.jpg" alt="Felipe Photo" className={st.devImg} />
              <a href="">
                <img src="\images\IN.png" alt="LI logo" className={st.linkedLogo} />
              </a>
            </div>

            <div className={st.developer}>
              <span>Lucas Dri</span>
              <img src="/images/Devs Pics/Lucas.jpg" alt="Lucas Photo" className={st.devImg} />
              <a href="https://www.linkedin.com/in/lucas-dri-ba0697241/">
                <img src="\images\IN.png" alt="LI logo" className={st.linkedLogo} />
              </a>
            </div>

            <div className={st.developer}>
              <span>Victor Cavallo</span>
              <img src="/images/Devs Pics/Victor.jpg" alt="Victor Photo" className={st.devImg} />
              <a href="https://www.linkedin.com/in/victor-cavallo-403326120/">
                <img src="\images\IN.png" alt="LI logo" className={st.linkedLogo} />
              </a>
            </div>
          </div>

        </div>

      </div>

      <Footer/>
    </div>
  )
}
