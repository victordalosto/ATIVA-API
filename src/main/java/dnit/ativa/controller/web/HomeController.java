package dnit.ativa.controller.web;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import dnit.ativa.controller.api.AtivaController;
import dnit.ativa.model.Modelo;

@Controller
@RequestMapping("/")
public class HomeController {

    @Autowired
    private AtivaController controller;


    @GetMapping
    public String homePage(Model model, String path, 
                           String nome, String condicao, 
                           String uf,   String br, String km,
                           String kmi,  String kmf) {
        List<? extends Modelo> lista = controller.get(path, nome, condicao, uf, br, km, kmi, kmf);
        if (lista.size()>5000)
            lista.subList(5000, lista.size()-1).clear();
        model.addAttribute("lista", lista);
        return "home";
    }


}
