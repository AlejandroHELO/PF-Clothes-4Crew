import React from 'react'
import Footer from '../Footer/Footer'

function HelpUsImprove() {

    return (
              <div className={st.InputButtonForm}>
                  <button 
                  className=' w-24 h-12 p-2 bg-slate-900 text-slate-50 rounded-lg flex justify-center items-center transition hover:bg-slate-50 hover:text-slate-900 hover:border-2 hover:border-slate-900'
                  disabled = {Message.message === ""}
                  name='update' 
                  ref={target} 
                  type="submit" 
                  onClick={(e) => {
                      handleSubmit(e);
                      setShow(!show);
                  }}>
                      Submit
                  </button>
              </div>

              <Overlay target={target.current} show={show} placement="right">
                  {(props) => (
                      <Tooltip id="overlay-example" {...props}>
                          Comment successfully send!
                      </Tooltip>
                  )}
              </Overlay>

          </form>

          <div className={st.imageDiv}>
              <img src="/images/newLogo.jpg" className={st.image} alt="img" />
          </div>
      </div>
            
    <Footer />
    </div>
    )
}

export default HelpUsImprove
