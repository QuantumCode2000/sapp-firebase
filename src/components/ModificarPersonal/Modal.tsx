import { useState } from "react";
import CustomSelect from "../customs/CustomSelect/CustomSelect";
import CustomButton from "../customs/CustomButton/CustomButton";
import { useContext } from "react";
import UsersContext from "../../context/UsersContext";

const Modal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const { updateListPersonal } = useContext(UsersContext)
    const [personalSelect, setPersonalSelect] = useState("");
    // const [dataPersonal, setDataPersonal] = useState({});
    const personal = JSON.parse(
        window.localStorage.getItem("listPersonal") as string
    );
    if (!open) return null;
    const nombresPersonal = personal.map((personal: any) => personal.nombre);
    const handleCustomSelect = (e, functionSelect) => {
        functionSelect(e.target.value);
    };
    const dataPersonal = personal.filter(
        (personal) => personal.nombre === personalSelect
    );

    const inactivarUsuario = () => {
        const data = JSON.parse(
            window.localStorage.getItem("listPersonal") as string
        );
        const newData = data.map((personal) => {
            if (personal.nombre === personalSelect) {
                personal.informacionLaboral.estado = "Inactivo";
            }
            return personal;
        });
        updateListPersonal(newData);
        window.localStorage.setItem("listPersonal", JSON.stringify(newData));
        onClose();
    };
    const activarUsuario = () => {
        const data = JSON.parse(
            window.localStorage.getItem("listPersonal") as string
        );
        const newData = data.map((personal) => {
            if (personal.nombre === personalSelect) {
                personal.informacionLaboral.estado = "Activo";
            }
            return personal;
        });
        updateListPersonal(newData);
        window.localStorage.setItem("listPersonal", JSON.stringify(newData));
        onClose();
    };
    return (
        <div className="overlay">
            <div className="modalContainer1">
                <p>Seleccione el Usuario</p>
                <CustomSelect
                    name="Personal"
                    arrayOptionsSelect={nombresPersonal}
                    onChange={(e) => {
                        handleCustomSelect(e, setPersonalSelect);
                    }}
                    value={personalSelect}
                />
                <p>
                    Estado del Usuario :{" "}
                    {personalSelect !== ""
                        ? dataPersonal[0]?.informacionLaboral?.estado
                        : "Sin Usuario Seleccionado"}
                </p>
                {personalSelect !== "" ? (
                    dataPersonal[0].informacionLaboral?.estado === "Activo" ? (
                        <CustomButton content="Desactivar" onClick={inactivarUsuario} />
                    ) : (
                        <CustomButton content="Activar" onClick={activarUsuario} />
                    )
                ) : null}
                <CustomButton content="Cerrar" onClick={onClose} />
            </div>
        </div>
    );
};

export default Modal;
