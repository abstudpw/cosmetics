import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Alert, Snackbar} from "@mui/material";
import {useState} from "react";
import {RootState} from "../app/store";

export default function Update() {

    const [open, setOpen] = useState(false);
    const params = useParams();
    const dispatch = useDispatch();
    const isNew = params.id === 'new' ? true : parseInt(params.id as string) < 0;
    const fromReducer = useSelector((state: RootState) => state.productReducer.data)
    const product = fromReducer ? fromReducer.find((value: any) => value.id.toString() === params.id) : null;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data: any) => saveEntity(data);


    const handleClose = () => {}

    const saveEntity = (values: any) => {
        const entity = {
            ...product,
            ...values,
        };

        if (isNew) {
            dispatch({type: 'new', payload: entity});
        } else {
            dispatch({type: 'update', payload: entity});
        }
        setOpen(true);
    };

    return (
        <div>
            <h1>{product ? 'Edytuj' : 'Dodaj nowy'} produkt {product ? `o id: ${product.id}` : ''}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" defaultValue={product ? product.name : ''} placeholder="Nazwa" {...register("name", {required: true, maxLength: 80})} />
                {errors && errors.name && errors.name.type === 'required' &&
                (<Alert variant="filled" severity="error" >
                    Nazwa jest wymagana
                </Alert>)
                }
                <input type="number" defaultValue={product ? product.price : ''} placeholder="Cena" {...register("price", {required: true, maxLength: 100, min: 0, max: 300, valueAsNumber: true })}/>
                {errors && errors.name &&
                (<Alert variant="filled" severity="error" >
                    Błędna cena
                </Alert>)
                }
                <input type="number" defaultValue={product ? product.volume : ''} placeholder="Pojemność" {...register("volume", {required: true, min: 0, valueAsNumber: true})} />
                {errors && errors.volume &&
                (<Alert variant="filled" severity="error" >
                    Niepoprawna wartość
                </Alert>)
                }
                <textarea defaultValue={product ? product.shortDescription : ''}  placeholder="Krótki opis" {...register("shortDescription", {required: true, maxLength: 2000})} />
                {errors && errors.shortDescription &&
                (<Alert variant="filled" severity="error" >
                    Niepoprawna wartość
                </Alert>)
                }
                <textarea defaultValue={product ? product.description : ''}  placeholder="Opis" {...register("description", {maxLength: 20000})} />
                {errors && errors.description &&
                (<Alert variant="filled" severity="error" >
                    Niepoprawna wartość
                </Alert>)
                }
                <input defaultValue={product ? product.img : ''}  type="url" placeholder="Zdjęcie (adres)" {...register("img", {required: true, maxLength: 300})} />
                {errors && errors.img &&
                (<Alert variant="filled" severity="error" >
                    Niepoprawny adres
                </Alert>)
                }
                <textarea defaultValue={product ? product.ingredients : ''} placeholder="Składniki" {...register("ingredients", {required: true, maxLength: 999})} />
                {errors && errors.ingredients &&
                (<Alert variant="filled" severity="error" >
                    Niepoprawna wartość
                </Alert>)
                }
                <textarea defaultValue={product ? product.methodOfUse : ''}  placeholder="Metoda użycia" {...register("methodOfUse", {maxLength: 2000})} />
                {errors && errors.methodOfUse &&
                (<Alert variant="filled" severity="error" >
                    Niepoprawna wartość
                </Alert>)
                }



                <input type="submit" />
            </form>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Poprawnie zaktualizowano produkt
                </Alert>
            </Snackbar>
        </div>

    )
}