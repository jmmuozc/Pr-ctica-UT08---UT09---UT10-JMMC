"use strict";

function showFeedBack(input, valid, message) {
  let validClass = (valid) ? 'is-valid' : 'is-invalid';
  let div = (valid) ? input.nextAll("div.valid-feedback") : input.nextAll("div.invalid-feedback");
  input.nextAll('div').removeClass('d-block');
  div.removeClass('d-none').addClass('d-block');
  input.removeClass('is-valid is-invalid').addClass(validClass);
  if (message) {
    div.empty();
    div.append(message);
  }
}

function newCategoryValidation(handler) {
  let form = document.forms.fNewCategory;
  $(form).attr('novalidate', true);
  $(form).submit(function (event) {
    let isValid = true;
    let firstInvalidElement = null;
    this.vfName.value = this.vfName.value.trim();
    if (this.vfName.value == "") {
      showFeedBack($(this.vfName), false);
    } else {
      showFeedBack($(this.vfName), true);
    }

    if (!this.CheckDelete.checked) {

      if (!this.Description.checkValidity()) {
        isValid = false;
        showFeedBack($(this.Description), false);
        firstInvalidElement = this.Description;
      } else {
        showFeedBack($(this.Description), true);
      }

      if (!this.Image.checkValidity()) {
        isValid = false;
        showFeedBack($(this.Image), false);
        firstInvalidElement = this.Image;
      } else {
        showFeedBack($(this.Image), true);
      }
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      handler(this.vfName.value, this.Description.value, this.CheckDelete.checked);
    }
    event.preventDefault();
    event.stopPropagation();
  });
}

function newPersonValidation(handler) {
  let form = document.forms.fNewPerson;
  $(form).attr('novalidate', true);
  $(form).submit(function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    if (this.DNI.value == "") {
      isValid = false;
      showFeedBack($(this.DNI), false);
      firstInvalidElement = this.DNI;
    } else {
      showFeedBack($(this.DNI), true);
    }
    
    
    
    if (!this.CheckDelete.checked) {
      this.vfName.value = this.vfName.value.trim();
      if (this.vfName.value == "") {
        showFeedBack($(this.vfName), false);
      } else {
        showFeedBack($(this.vfName), true);
      }
      
      if (!this.vfBorn.checkValidity()) {
        isValid = false;
        showFeedBack($(this.vfBorn), false);
        firstInvalidElement = this.vfBorn;
      } else {
        showFeedBack($(this.vfBorn), true);
      }

      if (!this.LastName.checkValidity()) {
        isValid = false;
        showFeedBack($(this.LastName), false);
        firstInvalidElement = this.LastName;
      } else {
        showFeedBack($(this.LastName), true);
      }


      if (!this.LastNameTwo.checkValidity()) {
        isValid = false;
        showFeedBack($(this.LastNameTwo), false);
        firstInvalidElement = this.LastNameTwo;
      } else {
        showFeedBack($(this.LastNameTwo), true);
      }

      if (!this.Image.checkValidity()) {
        isValid = false;
        showFeedBack($(this.Image), false);
        firstInvalidElement = this.Image;
      } else {
        showFeedBack($(this.Image), true);
      }
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      handler(this.type.value, this.vfName.value, this.CheckDelete.checked, fixInputDate(this.vfBorn.value), this.DNI.value, this.LastName.value, this.LastNameTwo.value);
    }
    event.preventDefault();
    event.stopPropagation();
  });
}
function newProductionValidation(handler) {
  let form = document.forms.fNewProduction;
  $(form).attr('novalidate', true);
  $(form).submit(function (event) {
    let isValid = true;
    let firstInvalidElement = null;
    this.vfTitle.value = this.vfTitle.value.trim();
    if (this.vfTitle.value == "") {
      showFeedBack($(this.vfTitle), false);
    } else {
      showFeedBack($(this.vfTitle), true);
    }

    if (!this.CheckDelete.checked) {

      if (!this.vfPublication.checkValidity()) {
        isValid = false;
        showFeedBack($(this.vfPublication), false);
        firstInvalidElement = this.vfPublication;
      } else {
        showFeedBack($(this.vfPublication), true);
      }

      if (!this.Nationality.checkValidity()) {
        isValid = false;
        showFeedBack($(this.Nationality), false);
        firstInvalidElement = this.Nationality;
      } else {
        showFeedBack($(this.Nationality), true);
      }

      if (!this.Synopsis.checkValidity()) {
        isValid = false;
        showFeedBack($(this.Synopsis), false);
        firstInvalidElement = this.Synopsis;
      } else {
        showFeedBack($(this.Synopsis), true);
      }

    }
    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      handler(this.type.value, this.vfTitle.value, this.CheckDelete.checked, fixInputDate(this.vfPublication.value), this.Nationality.value, this.Synopsis.value, selectedParameters(this.directorSelect), selectedParameters(this.actorSelect), selectedParameters(this.categorySelect));
    }
    event.preventDefault();
    event.stopPropagation();
  });
}

function changeCasting(handler) {
  let form = document.forms.fChangeCasting;
  $(form).attr('fChangeCasting', true);
  $(form).submit(function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      handler(this.productionSelect.value, this.actorSelect.value, this.directorSelect.value, this.CheckUnassign.checked);
    }
    event.preventDefault();
    event.stopPropagation();
  });
}

function logIn(handler) {
  let form = document.forms.fLogin;
  $(form).attr('fLogin', true);
  $(form).submit(function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      handler(this.vfUsuario.value, this.vfPasswd.value);
    }
    event.preventDefault();
    event.stopPropagation();
  });
}

function selectedParameters(MultiSelect) {
  let valueList = [];
  for (let select of MultiSelect) {
    if (select.selected) {
      valueList.push(select.value);
    }
  }
  return valueList;
}

function fixInputDate(date) {
  date = date.split("-");
  date = date.reverse();
  return date.join("/");

}
export { newCategoryValidation, newPersonValidation, newProductionValidation, changeCasting, logIn }