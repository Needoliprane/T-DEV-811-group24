from src.user import User
from src.covid import Covid
from src.drink import Drink
from src.eat import Eat
from src.enjoy import Enjoy
from src.sleep import Sleep
from src.direction import Direction

def test_direction():
    print("starting direction tests...")
    direction = Direction()
    direction.test1()
    direction.test2()
    direction.test3()
    print("Direction tests done, no error")

def test_sleep():
    print("starting sleep tests...")
    sleep = Sleep()
    sleep.test1()
    sleep.test2()
    sleep.test3()
    sleep.test4()
    sleep.test6()
    print("Sleep tests done, no error")


def test_enjoy():
    print("starting enjoy tests...")
    enjoy = Enjoy()
    enjoy.test1()
    enjoy.test2()
    enjoy.test3()
    enjoy.test4()
    print("Enjoy tests done, no error")

def test_user():
    print("starting user tests...")
    user = User()
    user.test_1()
    user.test_2()
    user.test_3()
    user.test_4()
    user.test_5()
    user.test_6()
    user.test_7()
    user.test_8()
    user.test_9()
    user.test_10()
    user.test_11()
    user.test_12()
    print("User tests done, no error")

def test_eat():
    print("starting eat tests...")
    eat = Eat()
    eat.test1()
    eat.test2()
    eat.test3()
    eat.test4()
    print("Eat tests done, no error")

def test_covid():
    print("starting covid tests...")
    covid = Covid()
    covid.test1()
    covid.test2()
    print("Covid tests done, no error")

def test_drink():
    print("starting drink tests...")
    drink = Drink()
    drink.test1()
    drink.test2()
    drink.test3()
    drink.test4()
    print("Drink tests done, no error")

import sys

if __name__ == '__main__':
    print("starting tests...")
    test_direction()
    test_enjoy()
    test_user()
    test_eat()
    test_covid()
    test_drink()
    test_sleep()
    print("All tests done, no error")

