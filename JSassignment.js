const COMMA_ENTRIES = [ // First name, City, Birth date
  'Mckayla, Atlanta, 5/29/1986',
  'Elliot, New York City, 4/3/1947',
]
const DOLLAR_ENTRIES = [ // City, Birth date, Last name, First name
  'LA $ 10-4-1974 $ Nolan $ Rhiannon',
  'NYC $ 12-1-1962 $ Bruen $ Rigoberto',
]

// WRITE YOUR FUNCTIONS / CLASSES HERE
class BaseFormatter {
  constructor (stringList) {
    this.op_stringList = stringList;
    this.formatted = [];
  }

  op_format (delimeter=" ") {
    //Args: (String) delimeter - defaults to whitespace char
    //returns: (Boolean) - false if op_string len is 0
    
    if (this.op_stringList.length === 0) return false;

    this.op_stringList.forEach((str, idx) => {
      this.formatted[idx] = str.split(delimeter)
    })
    return true;
  }

  async customFormat (cb_func) {
    this.formatted = await cb_func(this.formatted);
    return true
  }

  log () {
    console.log(this.formatted)
  }
}

class App {
  static async run({ comma = [], dollar = [] }) {
    // INVOKE YOUR MAGICAL CODE HERE
    const commaObj = new BaseFormatter(comma);
    const dollarObj = new BaseFormatter(dollar);

    commaObj.op_format(",");
    dollarObj.op_format("$");

    //Pass your custom operation as callback to customFormat
    await dollarObj.customFormat(async l_strs => {
      let formatted = [];
      for(const [idx, wordList] of l_strs.entries()){
        formatted[idx] = [wordList[3], wordList[0], wordList[1].replace(/-/g, "/")]
      }
      return formatted
    });

    commaObj.log();
    dollarObj.log();
  }
}

App.run({ comma: COMMA_ENTRIES, dollar: DOLLAR_ENTRIES })