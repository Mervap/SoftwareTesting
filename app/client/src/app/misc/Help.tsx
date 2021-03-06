import React, {Component} from 'react';
import '../styles/Help.css';

class Help extends Component {

  render() {
    return (
      <div className="help">
        <h2>Правила</h2>
        <p>Место действия этой игры — «вселенная» — это размеченная на клетки поверхность или плоскость — безграничная,
          ограниченная, или замкнутая (в пределе — бесконечная плоскость).</p>
        <p>Каждая клетка на этой поверхности может находиться в двух состояниях: быть «живой» (заполненной)
          или быть «мёртвой» (пустой). Клетка имеет восемь соседей, окружающих её.</p>
        <p>Распределение живых клеток в начале игры называется первым поколением. Каждое следующее поколение
          рассчитывается на основе предыдущего по таким правилам: в пустой (мёртвой) клетке, рядом с которой
          ровно три живые клетки, зарождается жизнь;</p>
        <p>Игра прекращается, если</p>
        <ul>
          <li>на поле не останется ни одной «живой» клетки</li>
          <li>конфигурация на очередном шаге в точности (без сдвигов и поворотов) повторит себя же на одном из более
            ранних шагов (складывается периодическая конфигурация)</li>
          <li>при очередном шаге ни одна из клеток не меняет своего состояния (складывается стабильная конфигурация;
            предыдущее правило, вырожденное до одного шага назад)</li>
        </ul>
        <p>Эти простые правила приводят к огромному разнообразию форм, которые могут возникнуть в игре.</p>
        <p>Игрок не принимает прямого участия в игре, а лишь расставляет или генерирует начальную
          конфигурацию «живых» клеток, которые затем взаимодействуют согласно правилам уже без его участия (он является наблюдателем).</p>
      </div>
    );
  }
}

export default Help;