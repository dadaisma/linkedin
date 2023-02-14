import React, { useState, useEffect } from "react";
import styles from "./ProfileBar.module.css";
import { Avatar, Button } from "@mui/material";
import { apiWrapper } from "../../utils/apiWrapper";
import Logout from "../logout/Logout";
import CompanyAdd from "@mui/icons-material/Add";

export const ProfileBar = (props) => {
  const userId = props.idUser;
  const [actualizar, setActualizar] = useState(true);
  const [data, setData] = useState({});

  const [puesto, setPuesto] = useState("");
  const [empresaActual, setEmpresaActual] = useState("");
  const [sector, setSector] = useState("");

  const [ubicacionPais, setUbicacionPais] = useState("");
  const [ubicacionCodigoPostal, setUbicacionCodigoPostal] = useState("");
  const [ubicacionCiudad, setUbicacionCiudad] = useState("");

  const [educacionInstitucion, setEducacionInstitucion] = useState("");
  const [educacionTitulacion, setEducacionTitulacion] = useState("");
  const [educacionDisciplina, setEducacionDisciplina] = useState("");

  const [telefono, setTelefono] = useState("");
  const [tipoTelefono, setTipoTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState();
  const [web, setWeb] = useState("");

  useEffect(() => {
    if (actualizar) {
      apiWrapper("user/" + userId).then((response) => {
        //console.log("dentro " + JSON.stringify(response));
        setData(response);
        setPuesto(response.puesto);
        setEmpresaActual(response.empresa_actual);
        setSector(response.sector);

        setUbicacionPais(response.ubicacion_pais);
        setUbicacionCodigoPostal(response.ubicacion_Codigo_postal);
        setUbicacionCiudad(response.ubicacion_Ciudad);

        setEducacionInstitucion(response.educacion_institucion);
        setEducacionTitulacion(response.educacion_titulacion);
        setEducacionDisciplina(response.educacion_disciplina);

        setTelefono(response.telefono);
        setTipoTelefono(response.tipo_telefono);
        setFechaNacimiento(new Date(response.fecha_nacimiento).toISOString().split("T")[0]);
        setWeb(response.web);
      });
      setActualizar(!actualizar);
    }
  }, [userId]);

  const fullName = data.nombre + " " + data.apellido;
  const avatar = data.avatar;
  const anonimAvatar =
    "https://res.cloudinary.com/dkxlwv844/image/upload/v1676019494/Avatars%20Joblink/AvatarMaker_5_eaymit.png";

  const handleClick = () => {
    const body = {
      puesto: puesto,
      empresa_actual: empresaActual,
      sector: sector,

      ubicacion_pais: ubicacionPais,
      ubicacion_Codigo_postal: ubicacionCodigoPostal,
      ubicacion_Ciudad: ubicacionCiudad,

      educacion_institucion: educacionInstitucion,
      educacion_titulacion: educacionTitulacion,
      educacion_disciplina: educacionDisciplina,

      telefono: telefono,
      tipo_telefono: tipoTelefono,
      fecha_nacimiento: fechaNacimiento,
      web: web,
    };

    //alert("body=" + JSON.stringify(body));
    apiWrapper("user/" + userId, "PATCH", body).then((response) => {
      //alert("updated Profile -> " + response);
      setActualizar(true);
    });
    //setActualizar(true);
  };

  const handleChange = (setObjectChanged, value) => {
    setObjectChanged(value);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__top}>
        <img src="./img/pexels-gradienta-6985001.jpg" alt="" />
        <Avatar
          className={styles.sidebar__avatar}
          img
          src={data.avatar ? avatar : anonimAvatar}
          alt=""
        />
        <h2>{fullName}</h2>
        <Logout content="LOGOUT" />
      </div>

      <div className={styles.sidebar__stats}>
        <div className={styles.sidebar__stat}>
          <p>Who viewed you</p>
          <p className={styles.sidebar__statNumber}>2,544</p>
        </div>
        <div className={styles.sidebar__stat}>
          <p>Views on post</p>
          <p className={styles.sidebar__statNumber}>2,344</p>
        </div>
      </div>
      <div className={styles.sidebar__stats}>
        <div className={styles.values}>
          <span>Fecha Nacimiento</span>
          <input
            type="date"
            value={fechaNacimiento}
            onChange={(e) => {
              handleChange(setFechaNacimiento, e.target.value);
            }}
          />
        </div>
        <div className={styles.values}>
          <span>Tipo Telefono</span>
          <select
            value={tipoTelefono}
            onChange={(e) => {
              handleChange(setTipoTelefono, e.target.value);
            }}
          >
            <option></option>
            <option>Trabajo</option>
            <option>Movil</option>
          </select>
          <span>Telefono</span>
          <input
            type="text"
            required="required"
            pattern="/[0-9]*"
            maxLength="9"
            value={telefono}
            onChange={(e) => {
              handleChange(setTelefono, e.target.value);
            }}
          ></input>
        </div>
        <div className={styles.values}>
          <span>Web</span>
          <input
            type="text"
            value={web}
            onChange={(e) => {
              handleChange(setWeb, e.target.value);
            }}
          />
        </div>
        <div className={styles.values}>
          <span className={styles.espacio}>&nbsp;</span>
        </div>

        <div className={styles.grouped}>
          <span>Educacion</span>
          <div className={styles.values}>
            <span>Institucion</span>
            <input
              type="text"
              placeholder="Universidad, .."
              value={educacionInstitucion}
              onChange={(e) => {
                handleChange(setEducacionInstitucion, e.target.value);
              }}
            />
          </div>
          <div className={styles.values}>
            <span>Titulacion</span>
            <input
              type="text"
              value={educacionTitulacion}
              onChange={(e) => {
                handleChange(setEducacionTitulacion, e.target.value);
              }}
            />
          </div>
          <div className={styles.values}>
            <span>Disciplina</span>
            <input
              type="text"
              placeholder="Empresariales, ..."
              value={educacionDisciplina}
              onChange={(e) => {
                handleChange(setEducacionDisciplina, e.target.value);
              }}
            />
          </div>
        </div>

        <div className={styles.grouped}>
          <span>Ubicacion</span>
          <div className={styles.values}>
            <span>Pais</span>
            <input
              type="text"
              value={ubicacionPais}
              onChange={(e) => {
                handleChange(setUbicacionPais, e.target.value);
              }}
            />
          </div>
          <div className={styles.values}>
            <span>Codigo Postal</span>
            <input
              type="text"
              value={ubicacionCodigoPostal}
              onChange={(e) => {
                handleChange(setUbicacionCodigoPostal, e.target.value);
              }}
            />
          </div>
          <div className={styles.values}>
            <span>Ciudad</span>
            <input
              type="text"
              value={ubicacionCiudad}
              onChange={(e) => {
                handleChange(setUbicacionCiudad, e.target.value);
              }}
            />
          </div>
        </div>

        <div className={styles.grouped}>
          <span>Trabajo Actual</span>
          <div className={styles.values}>
            <span>Nombre de la Empresa</span>
            <input
              type="text"
              value={empresaActual}
              onChange={(e) => {
                handleChange(setEmpresaActual, e.target.value);
              }}
            />
          </div>
          <div className={styles.values}>
            <span>Puesto de Trabajo</span>
            <input
              type="text"
              value={puesto}
              onChange={(e) => {
                handleChange(setPuesto, e.target.value);
              }}
            />
          </div>
          <div className={styles.values}>
            <span>Sector</span>
            <input
              type="text"
              value={sector}
              onChange={(e) => {
                handleChange(setSector, e.target.value);
              }}
            />
          </div>
        </div>

        <div className={styles.values}>
          <span className={styles.espacio}>&nbsp;</span>
          <Button
            onClick={() => {
              handleClick();
            }}
          >
            Actualizar
          </Button>
        </div>
      </div>
      <div className={styles.sidebar__detail}>
        <button
          className={styles.companyAdd}
          onClick={() => {
            alert("click");
          }}
        >
          <CompanyAdd className={styles.companyAdd_icon} />
          Añadir Empresa
        </button>
      </div>
      {/*
      <div className={styles.sidebar__bottom}>
        <p>Recent</p>
      </div>
      */}
    </div>
  );
};

export default ProfileBar;
