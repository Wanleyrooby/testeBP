import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario = new Usuario()
  idUsuario: number
  confirmSenha: string
  tipoUsuario: string
 
  

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService

  ) { }

  ngOnInit(){
    window.scroll(0,0)
    
    
    if(environment.token == ''){
      this.alertas.showAlertInfo('Sua seção expirou, faça o login novamente')
      this.router.navigate(['/login'])
    }

    this.idUsuario = this.route.snapshot.params['id']
    this.findByIdUsuario(this.idUsuario)
  }

  confirmarSenha(event: any){
    this.confirmSenha = event.target.value
  }

  

  tipoUser(event: any){
    this.tipoUsuario = event.target.value

  }

    atualizar(){
     
      
      
      if(this.usuario.senha != this.confirmSenha){
        this.alertas.showAlertDanger('As senhas são diferentes!')
      }else {
        this.authService.atualizar(this.usuario).subscribe((resp: Usuario)=>{
          this.usuario = resp
          this.router.navigate(['/inicio'])
          this.alertas.showAlertSuccess('Usuário atualizado com sucesso, faça o login novamente')

          environment.token = ''
          environment.nome = ''
          environment.foto = ''
          environment.id = 0
  
          this.router.navigate(['/login'])
  
        })
        
      }

    }

    findByIdUsuario(id: number){
      this.authService.getByIdUsuario(id).subscribe((resp: Usuario)=>{
        this.usuario = resp

      })
      
    }



}
