# js--gurtam-rows-lister

**Тестовое задание JavaScript**

Реализовать на JavaScript виртуальный список (таблицу). 

Построение таблицы с большим количеством строк является трудоемкой задачей даже для современных браузеров. Выполнение этой задачи можно разделить на несколько подзадач:
1.	Ограничение количества одновременно существующих DOM элементов таблицы(строк).
2.	Реализация полноценного механизма прокрутки такой таблицы(клик по произвольному месту скролла, перетягивание ползунка, нажатие кнопок вверх/вниз).
3.	Сохранение и восстановление состояний элементов отображаемых и не существующих строк(в данном случае радиобаттонов).

В виртуальном режиме данные хранятся в массиве, и на экране в таблице отображаются только строки, соответствующие области видимости таблицы, пример:
 
При прокрутке скроллинга в таблице отображается только часть данных (строк), соответствующая видимой области: 20 строк из 1000 с  101 по 121, при изменении позиции скролла будет показывать строки с 340 по 360 из 1000 и т.д. При этом нужно, чтобы скроллинг соответствовал количеству строк в таблице, т.е. чтобы щёлкая на середине скроллинга можно было попасть в середину списка, щелкая в начале или конце, также попасть в начало или конец списка.

Также в каждой строке должны быть 3 (три) radiobutton, где можно выставить только одно из состояний. По-умолчанию выставляется самый первый radiobutton (столбец). Также данная таблица должна позволять делать любые изменения radiobuttons.

Далее все любые изменения должны быть сохранены например в куки, чтобы при обновлении страницы по F5 они снова оказались на своих местах, пример:


Исходные данные Array > 10000 элементов, элементы массива строки «тест1, тест2,…». В итоге должна получиться HTML страница, работающая в браузерах: IE, Firefox, Chrome, Opera.




