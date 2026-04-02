# React Opinionated OOP Sample (react-ooop-sample)

## Why?

I like React but I have issues. I'm not a fan of the whole "everything is big functions that return JSX strings" paradigm. It's very OOOOLD-school javascript, very PHP. I'm from the C# and Python world, so I prefer object-oriented declarative patterns like what you see in Angular (as bloated as it is, it's still friendlier). When I look at a moderately sized component, I just see tech debt.

But just because it's standard practice doesn't necessarily make it a requirement. I kept thinking, "there has to be a better way." It kept eating at me until I realized that I was just looking at it wrong. The JSX is not constructing the HTML to return; it is just constucting the view and returning it. You always construct the view model first, before providing it to the new view.

To test it out, I made this project, and I didn't run into any roadblocks that couldn't be overcome. It tried to get in the way a few times, but persistence won out. This is an opinionated, object-oriented focus on React, built entirely around my personal preferences.

I'm not saying that the "soup of functions" coding style is always wrong. It's perfect for tiny components (this project has two). But it swiftly becomes clumsy. For larger screens, like an editor, I find this style easier to read. I would not be surprised if React devs hate this .NET-looking thing, but it really helped me understand the framework.

## The application

The demo app is Chat Storm, a very primitive and wholly fictional AI chat client. The user chooses from a list of chatbots, types a question, and saves. A little bit later, the chatbot responds. The user can view a list of questions and responses. All very basic.

## MVVM & services

This project uses the standard Model-View-ViewModel architecture. The model is the data (state, redux). The view is the JSX, and a few events. The view models are the two classes that bind the data to the UI and push updates from the UI back to the model.

The "services" folder holds services that handle special data access. If there were a real outside system, it would be here. It also contains redux and local state objects, because each of them require special coding styles (different in each case) that don't match anything else. From a developer standpoint, that makes them stand apart in the same way that fetching data from a service stands apart (a bit of overhead I never needed in frameworks with reactives like Angular and Vue).

## Disclaimer

This is just a demo project, whose requirements were "I wanted to test this." I tested everything and it seems good, but I easily could have missed something important.
