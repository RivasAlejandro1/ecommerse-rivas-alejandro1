import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "./categories.entity";
import { Repository } from "typeorm";
import * as data from "../utils/data.json";
import { elementAt } from "rxjs";


@Injectable()
export class categoriesRepository{
    constructor(@InjectRepository(Categories) private readonly categoriesRepositoryDB : Repository<Categories>){
    }

    async getCategories(){

        const allCategories = await this.categoriesRepositoryDB.find()
        if(!allCategories.length) return "No category found"
        return  allCategories
    }
    async seederCategories(){

        data?.map(async ( product) =>{
            await this.categoriesRepositoryDB.
            createQueryBuilder()
            .insert()
            .into(Categories)
            .values({ name: product.category})
            .orIgnore()
            .execute()
        }
        )

        return "All categories have been added."
    }
}