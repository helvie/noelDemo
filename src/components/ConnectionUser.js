import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import UserPasswordRequest from "../components/smallElements/UserPasswordRequest";

////////////////////////////////////////////////////////////////////////////////

function ConnectionUser(props) {



  const [signinName, setSigninName] = useState('');
  const [signinPassword, setSigninPassword] = useState('');
  const [errors, setErrors] = useState({});

  //oooooooooooooooo Vérification des erreurs avant enregistrement ooooooooooooooo

  const handleSignin = () => {
    const validationErrors = {};

    const validateName = (name) => {
      const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s-]+$/;
      return nameRegex.test(name);
    };


    if (!signinName) {
      validationErrors.name = "Veuillez remplir le champ prénom";
    } else if (!validateName(signinName)) {
      validationErrors.name = "Veuillez saisir un prénom valide";
    }

    if (!signinPassword) {
      validationErrors.password = "Veuillez remplir le champ password";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    props.onValidation({
      signinName,
      signinPassword
    });
  };

  //ooooooooooooooooooo Mise à vide des champs de formulaire oooooooooooooooooooo

  const resetForm = () => {
    setSigninName('');
    setSigninPassword('');
    setErrors({});
  };



  ////////////////////////////////////////////////////////////////////////////////

  return (
    <main className={styles.orgContent}>

      <div className={styles.formContainer}>


        <div className={styles.loginForm}>

          <h1 className={styles.formTitle}>Connecte-toi !</h1>


          {/* --------------------------- Input name -------------------------- */}

          {props.errorLoginPass && <div style={{color:"#e6bc14", marginBottom:"20px"}}>N&apos;importe nawak ce que tu as mis comme login ou mot de passe !</div>}

            <p className={styles.connectionInputTitle}>Prénom</p>
            <input
              className={styles.inputRegistration}
              type="text"
              placeholder="nom"
              aria-label="signinName"
              id="signinName"
              onChange={(e) => setSigninName(e.target.value)}
              value={signinName}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}

          {/* ------------------------ Input mot de passe ----------------------- */}

            <p style={{marginTop:"30px"}} className={styles.connectionInputTitle}>Mot de passe</p>

            <input
              className={styles.inputRegistration}
              type="password"
              placeholder="***"
              aria-label="Full name"
              id="signinPassword"
              onChange={(e) => setSigninPassword(e.target.value)}
              value={signinPassword}
            />
            {errors.password && <p className={styles.error}>{errors.password}</p>}


          {/* ------------------ Bouton de validation du formulaire ------------- */}


          <button
            className={styles.validButton}
            type="button"
            onClick={handleSignin}
          >
            En avant pour Noël !!!
          </button>
        </div>

        <UserPasswordRequest/>
      </div>
    </main>
  );
}

export default ConnectionUser;

