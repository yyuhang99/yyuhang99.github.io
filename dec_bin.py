import random

def convert_bin(number):
    binary = ""
    
    while(number>0):
        binary += str(number%2)
        number //= 2

    return binary[::-1]

def convert_dec(number):
    decimal = 0
    i = 0
    for num in (number[::-1]):
        if num == "1":
            decimal += 2**i
        i+=1

    return decimal

def random_num():
    num = random.randint(1, 100)
    print("The random number " + str(num) + " is converted into " + convert_bin(num))

def main():
    dec_num = int(input("Enter a decimal number: "))
    print("The binary version is: " + convert_bin(dec_num))
    bin_num = input("Enter a binary number: ")
    print("The decimal version is: " + str(convert_dec(bin_num)))

main()