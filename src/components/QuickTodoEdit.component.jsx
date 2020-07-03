import React from "react";

export default function QuickTodoEdit() {
  return pug`
    #quickTodoEdit.modal( data-keyboard="false", tabIndex="-1", role="dialog", aria-labelledby="staticBackdropLabel", aria-hidden="true")
      .modal-dialog
        .modal-content
          .modal-header
            h5#staticBackdropLabel.modal-title Modal title
            button.close(type="button", data-dismiss="modal", aria-label="Close")
              span(aria-hidden="true") ×

          .modal-body
            | ...

          .modal-footer
            button.btn.btn-secondary(type="button", data-dismiss="modal") Close

            button.btn.btn-primary(type="button") Understood
  `;
}
