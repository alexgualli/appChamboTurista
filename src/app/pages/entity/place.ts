import Category from './category';

export default class Place {
    public categoria:Category=new Category();
    public nombre?: string;
    public descripcion?: string;
    public latitud: number;
    public longitud: number;
    public id?: number;
}