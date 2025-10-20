import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import HomePage from './HomePage';

vi.mock('axios');

describe('Homepage component', () => {
    let loadCart;

    beforeEach(() => {
        loadCart = vi.fn();
        //This mocks the behavior of axios.get_ but can CONTROL what it returns without making real HTTP requests.
        axios.get.mockImplementation(async (urlPath) => {         
            if(urlPath === '/api/products') {
//In this custom implementation of fake HTTP request (control) we are looking for Two products to be returned. 
//The '/api/products' reuest return a "response.data" - where data is an array of product objects << we need to match the format of array of object in return!!
                return {
                    data: [ 
                        {
                            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                            rating: {
                                stars: 4.5,
                                count: 87
                            },
                            priceCents: 1090,
                            keywords: ["socks", "sports", "apparel"]
                        },
                        {
                            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                            image: "images/products/intermediate-composite-basketball.jpg",
                            name: "Intermediate Size Basketball",
                            rating: {
                                stars: 4,
                                count: 127
                            },
                            priceCents: 2095,
                            keywords: ["sports", "basketballs"]
                        }
                    ]
                };
            }
        });                         
    });

    it('display the products correct', async () => {
        render(
            <MemoryRouter>
                <HomePage cart={[]} loadCart={loadCart}/> {/*To NOT test cart, we can assign it an EMPTY array*/}
            </MemoryRouter>
        );  
        //Because '/api/products' request is run asynchronously, the data is NOT IMMEDIATELY available to be tested with getAllByTestId() and the test would FAIL. 
        //Since findAllByTestId awaits, the test would PASS 
        const productContainer = await screen.findAllByTestId('product-container');

        //1. How many products returned
        expect(productContainer.length).toBe(2);

        //2. Check if the correct product name is in 1st & 2nd elements of array
        expect(
            within(productContainer[0]).getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
        ).toBeInTheDocument();

         expect(
            within(productContainer[1]).getByText('Intermediate Size Basketball')
        ).toBeInTheDocument();
    });
});