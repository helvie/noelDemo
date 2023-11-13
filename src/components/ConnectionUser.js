import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';

////////////////////////////////////////////////////////////////////////////////

function ConnectionUser(props) {


  const router = useRouter();
  const dispatch = useDispatch();

  const [signinName, setSigninName] = useState('');
  const [signinPassword, setSigninPassword] = useState('');
  const [errors, setErrors] = useState({});

  //oooooooooooooooo Vérification des erreurs avant enregistrement ooooooooooooooo

  const handleSignin = () => {
    const validationErrors = {};

    const validateName = (name) => {
      // Vérification de l'adresse e-mail à l'aide d'une expression régulière
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
    // resetForm();
  };

  //ooooooooooooooooooo Mise à vide des champs de formulaire oooooooooooooooooooo

  const resetForm = () => {
    setSigninName('');
    setSigninPassword('');
    setErrors({});
  };

  // //oooooooooooo Récupération des données de l'utilisateur en base de données oooooooooo

  // function ConnectionUser() {

  //   fetch(`${BACKEND_URL}/users/signin`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ name: signinName, password: signinPassword })
  //   })
  //     .then(response => response.json())

  //     // Transfert vers page d'accueil
  //     .then(data => {
  //       if (data.result) {

  //         dispatch(login(data))
  //         router.push('/');
  //         return true
  //       }
  //       else {

  //         return false
  //       }
  //     })
  // }

  ////////////////////////////////////////////////////////////////////////////////

  return (
    <main className={styles.orgContent}>
      <div className={styles.formContainer}>


        <div className={styles.loginForm}>

          <h1 className={styles.formTitle}>Connecte-toi !</h1>

          {/* <form className="w-full"> */}

          {/* --------------------------- Input name -------------------------- */}

          {props.errorLoginPass && <div style={{color:"#e6bc14", marginBottom:"20px"}}>N&apos;importe nawak ce que tu as mis comme login ou mot de passe !</div>}

          {/* <div className={styles.inputRegistrationContainer}> */}
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
          {/* </div> */}

          {/* ------------------------ Input mot de passe ----------------------- */}

          {/* <div className={styles.inputRegistrationContainer}> */}
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

          {/* </div> */}

          {/* ------------------ Bouton de validation du formulaire ------------- */}


          <button
            className={styles.validButton}
            type="button"
            onClick={handleSignin}
          // disabled={!!error} // Désactiver le bouton si une erreur est présente
          >
            En avant pour Noël !!!
          </button>
          {/* </form> */}
        </div>
      </div>
    </main>
  );
}

export default ConnectionUser;

