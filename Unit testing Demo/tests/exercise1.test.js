const exercise = require('../exercise1');


describe('fizzBuzz',()=>{
    it('should throw error if input is not a number',()=>{
        const args = [null, undefined, 'a', true, false,{}];
        args.forEach(a=>{
            expect(()=>{exercise.fizzBuzz(a)}).toThrow();
        })
    })

    it('should return FizzBuzz if input is divisible by 3 and 5',()=>{
        const result = exercise.fizzBuzz(15)
        expect(result).toBe('FizzBuzz');
    })
    it('should return Fizz if input is divisible by 3',()=>{
        const result = exercise.fizzBuzz(3)
        expect(result).toBe('Fizz');
    })
    it('should return Buzz if input is divisible by 5',()=>{
        const result = exercise.fizzBuzz(5)
        expect(result).toBe('Buzz');
    })
    it('should return input if input is divisible by 3 or 5',()=>{
        const result = exercise.fizzBuzz(1)
        expect(result).toBe(1);
    })
})
