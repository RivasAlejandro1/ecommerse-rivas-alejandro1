import { Injectable } from '@nestjs/common';
import { categoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
    constructor( private categoriesRepository: categoriesRepository){}

    getCategories(){
        return this.categoriesRepository.getCategories()
    }
    seederCategories(){
        return this.categoriesRepository.seederCategories()
    }
}
