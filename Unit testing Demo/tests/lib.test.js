/**
 * Number of unit test must be less than equal to number of execution path.
 * Refactoring is easy with unit testing .
 * Test should not be too specific, otherwise it will fail easily 
 */
const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

// describe()     This function is used for grouping of

describe('absolute', ()=>{
    it('should return a positive number if input is positive',()=>{
        const result = lib.absolute(1);
        expect(result).toBe(1);
    })

    it('should return a positive number if input is negative',()=>{
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    })

    it('should return a 0 if input is 0',()=>{
        const result = lib.absolute(0);
        expect(result).toBe(0);
    })
});

describe('greet',()=>{
    it('should return greeting message',()=>{
        const result = lib.greet('Ankur');
        // expect(result).toBe('Welcome Ankur');
        expect(result).toMatch(/Ankur/);
        expect(result).toContain('Ankur');
    })
});

describe('getCurrencies',()=>{
    it('it should return supported currencies', ()=>{
        const result = lib.getCurrencies();

        // Too general
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        // Too specific
        expect(result[0]).toBe('USD');
        expect(result[1]).toBe('AUD');
        expect(result[2]).toBe('EUR');
        expect(result.length).toBe(3);

        // Proper Way
        expect(result).toContain('USD');
        expect(result).toContain('AUD');
        expect(result).toContain('EUR');

        //Ideal way
        expect(result).toEqual(expect.arrayContaining(['EUR','USD','AUD']));

    });
});

describe('getProduct',()=>{
    it('sholud return the product with the given id',()=>{
        const result = lib.getProduct(1);

        // toBe and toEqual are too specific
        // expect(result).toBe({id:1, price:10});  // this test case fails because both the objects, that is, object 
        //                                         // in result and the second, are at different locations in
        //                                         // memory
        expect(result).toEqual({id:1, price:10});
        expect(result).toMatchObject({id:1, price:10});

        /**
         * the difference between the above two is that, toEqual() matches exactly and toMatchObject() matches
         * whether these properties are present in the object.
         * If we add a new property in our production code then toEqual() fails but toMatchObject() passes because
         * it is just matching for the two properties.
         *  */ 
        
         expect(result).toHaveProperty('id',1);// this matches only for "id" but the type of value must be same 
    })
});

describe('registerUser',()=>{
    it('should throw if username is falsy', ()=>{
        // Null
        // undefined
        // NaN
        // ''
        // 0
        // false
        const args = [null, undefined, NaN, '', 0, false];
        args.forEach(a=>{
            expect(()=>{lib.registerUser(a)}).toThrow();
        })
    });
    it('should return a user object if valid username is passed',() =>{
        const result = lib.registerUser('Ankur');
        expect(result).toMatchObject({username: 'Ankur'});   // Both are for the
        expect(result.id).toBeGreaterThan(0);               // same execution path
    })
});


describe('applyDiscount',()=>{
    it('should apply 10% discount if customer has more than 10 points',()=>{
        
        db.getCustomerSync = function(id){            // This is a MOCK function of the getCustomerSync
            console.log('Fake Reading....');          // It is to be done in case we have to call a web API for unit
            return {id:id, points: 11};               // test and it may be possible that the API is not working 
        }                                             // at that time. In such case our test still fail without any
                                                     // without any bug 
        
        const order = { customerId: 1, totalPrice: 10 }
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    })
});



describe('notifyCustomer',()=>{
    it('should send email to the customer',()=>{
        
                // const mockFunction = jest.fn();
                // mockFunction.mockReturnValue(1);
                //mockFunction.mockResolvedValue(1);   // this is for promise
                // mockFunction.mockRejectedValue(new Error('..message..'));  // this is for error
                // const result = await mockFunction();
        
        
        
        // db.getCustomerSync = function(id){            
        //     return {email: 'a'};               
        // }    
        
        // let mailSent = false;
        // mail.send = function(email, message){
        //     mailSent = true
        // }

        // lib.notifyCustomer({customerId: 1});

        // expect(mailSent).toBe(true);

        //------------- Implementation of mock function with jest.fn() is given below ------------------------

        db.getCustomerSync = jest.fn().mockReturnValue({email: 'a'});
        mail.send = jest.fn();

        lib.notifyCustomer({customerId: 1});

        expect(mail.send).toHaveBeenCalled(); // In order to check arguments we can use toHaveBeenCalledWith() matcher
                                             // but it works for numbers, boolean etc. but not for strings
        expect(mail.send.mock.calls[0][0]).toBe('a');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    })
});