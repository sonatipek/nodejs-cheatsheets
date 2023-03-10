# Module Export ve Require
## Require
Node.js de modüller de, paketler de
```node
require('./fileName.js');
//or
require('./fileName')
```
kodu içerisinde çağırılır. 

**Not:** *Require kullanırken dosya uzantısı eklenmek zorunda değildir.*
**Önemli Not:** *Require ile eklenen modülün kodları değil, yaptığı iş alınır. Yani istediğiniz taktirde kodların içeriğine erişiminiz yoktur.*

Yani bu noktada:
``` js
//module.js
function sayHello(name){
	console.log(`Hello ${name}`)
}

sayHello("world!")
```

```js
//main.js
require('./module')

```
Yukarıdaki kodların çıktısı ``Hello world!`` olacaktır. Bütün iş ``module.js`` dosyasında yapılmıştır, ve daha sonra ``main.js`` dosyasında çalıştırılmıştır. ``module.js`` dosyasında fonksiyonun kullanılmaması; çıktı alınmamasına, fonksiyonun ``main.js`` dosyasında kullanılmaya çalışılması ise; ``sayHello is not defined`` hatasına sebebiyet verecektir.

Bu doğrultuda yerine göre bu kullanım, yerine göre birazdan göreceğimiz ``Module Export`` yapısı kullanılabilir.

Module Export kullanımı olmadan, require ile kodun yaptığı işi kullanmanın avantajları şöyledir;

| `Güvenlik` | *Bu sayede değişkenlere, func., vs. erişim sağlanamadığından daha güvenli olduğu söylenebilir* |
| -------- | -------------------------------------------------------------------------------------------- |

| `Error Safety` | *Dahil edilen modülün içerisindeki kodlara erişim olmadığından, func. ve değişken isimleri çakışmıyor.* |
| -------------- | ----------------------------------------------------------------------------------------------------- |


## Module Export
Modülün içerisindeki kodların da dosyaya dahil edilmesi istenirse, dahil edilecek dosyada ``Export`` işlemi yapılmalıdır. Bütün fonksiyonları veya belli fonksiyonları export edebilirsiniz.
``module.export`` işlemi ile export edilecek fonksiyonu tanımlayabiliriz.

Module Export işlemi ve bu dosyanın ``require`` ile dosyaya dahil edilebilmesi için;
``` js
// module.js
function sayHello(name){
	console.log(`Hello ${name}`)
}

module.exports = sayHello
```

```js
// main.js
const sayHello = require("./module")

sayHello("GitHub!")

//output: Hello GitHub!
```
Bu kullanımda hem ``module.js`` dosyasının kodları, hem de işleri alınmıştır. 

Yukarıdaki kullanımda ``module.js`` dosyasındaki function ismi ile, export edilen fonksiyonun ismi aynı olmak zorundadır. Yoksa hata verecektir. Farklı isim vermenin de bir yolu var ancak şimdilik bunu es geçiyorum.

Fakat  ``main.js`` dosyasında kullanılan değişken ismi, ``module.js`` dosyasındaki fonksiyon ismi ile aynı olmak zorunda değildir. Aynı olması, geliştirici alışkanlıklarından kaynaklanır ve bu şekilde kullanımı temiz kod bakımından tavsiye edilir. Ve tabii ki tanımladığınız değişken ismi ile, kullandığınız fonksiyon ismi aynı olmalıdır. 

*Tekrar etmekte faya var:* ``require ve module`` özellikleri Node.js ile gelen özelliklerdendir. Javascriptte yoktur. Bu sebeple tarayıcıda çalışmazlar. 

### Birden Fazla Function ile Module Export
Birden fazla fonksiyonu export edebilmek için, yukarıdaki kullanımdan farklı bir kullanımı tercih etmemiz gerekiyor.

Bunun için;
```js
module.exports = {
	variableName_1: funcName1,
	variablaName_2: funcName2 
}
```
yukarıdaki kullanımı uygulamalıyız. Tabiki bu kullanımı istersek yine tek bir fonksiyon için de kullanabiliriz.

Bu kullanım sayesinde fonksiyon adını import edeceğimiz dosya için değiştirebiliriz. Fakat yine tekrar etmekte fayda var; fonksiyon ismini değiştirmek pek önerilmez. Eğer anlamlı bir şekilde değiştirecek olursanız, import ettiğiniz kısımda ``variableName``'i kullanırsınız. 

Dİğer yandan bu tanımlama Javascriptte ``Object Literal`` olarak tanımlanır. Yani ilk kullanımdan farklı olarak, ``require`` ile dosyaya dahil ettikten sonra da kullanımda bir değişiklik yapmanız gerekir. 

Bunu daha açık bir şekilde kodlar üzerinde gösterecek olursak;
``` js
//module.js

function sayHello(name){
	console.log(`Hello ${name}`);
}

function sayMyName(name){
	console.log(`${name}`);
}

module.exports = {
	sayHelloVar: sayHello,
	sayMyNameVar: sayMyName
}
```

```js
// main.js
const module = require("./module")

module.sayHelloVar("GitHub!")
module.sayMyNameVar("Heisenberg")

//output1: Hello GitHub!
//output2: Hesienberg
```
Yukarıda olduğu gibi, eğer ``Object Literal`` kullanımında Javascript'te olduğu gibi bir obje kullanımı ile fonksiyonlara ulaşabiliriz. 
Kodlayacak olursak; ``filename.funcName()``

Fakat yukarıdaki kullanım, değişken isimlendirilmesinden dolayı pek tavsiye edilmiyor. Ben de aşağıdaki kullanımı daha fazla gördüğümü belirtmek isterim.

Clean Code için önerilen kullanım aşağıdaki gibidir;
```js
module.exports{
	sayHello: sayHello,
	sayMyName: sayMyName
}
```

#### Object Literal Alternatifleri
Yukarıdaki kullanım ile ilgili bir çok aynı kapıya çıkan yöntemler var. Başka kodları okurken bu yöntemlerden haberdar olmak her zaman iyidir. Bu sebeple birkaç kullanımı daha göstermek istiyorum.

Bütün vereceğim örneklerde export yöntemi aşağıdaki gibidir;
``` js
//module.js
module.exports{
	sayHello: sayHello,
	sayMyName: sayMyName,
	otherFunc: otherFunc;
}
```

##### Object Literal ile Tek Function Çağırma
```js
const sayMyName = require('./module').sayMyName;

sayMyName("Heisenberg")

//output: Heisenberg
```
Yukrıda ``Object Literal`` olarak export edilmiş nesnelerden sadece bir tanesini çağırmış ve böylece fonkisiyonu tekrar kullanırken nesne yapısını kullanmamış oluyoruz.

##### Object Literal ile Belirli Fonksiyonları Çağırma
```js
const {sayHello, sayMyName} = require('./module')

sayMyName("Sonat")
sayHello("World!")

//output1: Sonat
//output2: Hello World!
```
Yukarıdaki kullanımla beraber, sadece belirli fonksiyonları çağırabiliyoruz. Bu kullanımda yine ``filename.function()`` şeklinde kullanım yapmıyoruz.


## Fonksiyonların Klasörden Kullanımı
Yukarıda gördüğümüz ``module.export`` ve ``require`` gibi kavramları iyice özümsedikten sonra bu kullanımın da farkında olmakta fayda var. 

Eğer ``require`` kullanırken dosya yolu olarak bir Javascript dosyası değil, bir klasör verirsek ne olur?
Verdiğiniz dosya yolunda, dosya ismine karşılık gelen bir Javascript dosyası yoksa, Node.js bu isimde klasörleri aramaya başlar. Bunu bir örnek ile anlatalım.

Aşağıdaki gibi bir dosya yapısı kuralım;
```
.
├── module
|    ├── index.js
|    ├── sayHello.js
|    └── sayMyName.js
|
└── main.js
```

```js
//module/index.js
const sayMyName = require('./sayMyName');
const sayHello = require('./sayHello');

  
module.exports = {
    sayMyName: sayMyName,
    sayHello: sayHello
}

```

```js
//module/sayHello.js
const sayHello = function(name){
	console.log(`Hello ${name}!`);
}

module.exports = sayHello;
```

```js
//module/sayMyName.js
const sayMyName = function(name){
	console.log(name);
}

module.exports = sayMyName;
```
*Fonskiyon tanımının yukarıdaki gibi tanımlanması keyfidir.*

```js
//main.js
const module = require('./module')

module.sayHello('World');
module.sayMyName('Heisenberg');

//output1: Hello World!
//output2: Hesienberg
```

**Not:** *Bu kullanımın hata vermemesi için ``require`` kullanırken verilen path'e dosya uzantısı verilmemelidir!*

Yukarıda tamamen parçalanan ve ayrı dosyalar içerisinde bulunan fonksiyonları, sadeece ``index.js`` içerisine koyarak da aynı sonucu alabilirsiniz. Yukarıdaki örnekte, fonksiyonları ne kadar parçalayabileceğiniz gösterilmiştir.